import {idlFactory} from "./did/databox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {
  FilePut,
  Result_1,
  Result_10,
  Result_2,
  Result_3,
  Result_7,
  Result_9
} from "./did/databox_type";
import random from "string-random"
import {nanoid} from "nanoid";
import {Principal} from "@dfinity/principal";
import {changePlainFilePermissionArg, shareFileArg} from "../types";
import {AESEncryptApi, EncryptApi, RSAEncryptApi} from "../utils";
import {MetaBox} from "../metabox";


const chunkSize = 1992288
const ONE_BYTE_UPLOAD_USE_CYCLES = 2260

export class DataBox {
  private readonly agent: HttpAgent
  private readonly DataBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(canisterId: string, agent: HttpAgent) {
    this.agent = agent
    this.DataBoxActor = Actor.createActor(idlFactory, {agent, canisterId})
  }

  public async canisterState(): Promise<Result_10> {
    try {
      return await this.DataBoxActor.canisterState() as Result_10
    } catch (e) {
      throw e
    }
  }

  public async cycleBalance(): Promise<Result_7> {
    try {
      return await this.DataBoxActor.cycleBalance() as Result_7
    } catch (e) {
      throw e
    }
  }

  public async put_plain_files(files: File[], is_private: boolean): Promise<string[]> {
    try {
      const Actor = this.DataBoxActor
      const keyArr: Array<string> = []
      const allPromise: Array<Promise<any>> = []
      for (const file of files) {
        const key = nanoid()
        keyArr.push(key)
        const total_size = file.size
        const total_index = Math.ceil(total_size / chunkSize)
        const allData = await this.FileRead(file)
        for (let i = 0; i < allData.length; i++) {
          const arg: FilePut = {
            PlainFilePut: {
              IC: {
                file_extension: file.type,
                order: BigInt(i),
                chunk_number: BigInt(total_index),
                chunk: {data: allData[i]},
                aes_pub_key: [],
                file_name: file.name,
                file_key: key,
                total_size: BigInt(file.size),
                is_private: is_private
              }
            }
          }
          allPromise.push(Actor.put(arg))
        }
      }
      await Promise.all(allPromise)
      return keyArr
    } catch (e) {
      throw e
    }
  }

  public async FileRead(file: File | Blob): Promise<Uint8Array[]> {
    try {
      return new Promise((resolve, reject) => {
        let start = 0;
        let currentChunk = 0;
        const total_index = Math.ceil(file.size / chunkSize)
        const allData: Array<Uint8Array> = []
        let blobSlice = //@ts-ignore
          File.prototype.slice ||
          //@ts-ignore
          File.prototype.mozSlice ||
          //@ts-ignore
          File.prototype.webkitSlice;
        let reader = new FileReader();
        reader.onload = async function (e: any) {
          allData.push(new Uint8Array(e.target.result))
          if (currentChunk === total_index) return resolve(allData)
          else loadChunk()
        }
        reader.onerror = (error) => {
          reject(error)
        }
        const loadChunk = () => {
          const end = start + chunkSize;
          currentChunk++;
          reader.readAsArrayBuffer(blobSlice.call(file, start, end));
          start = end;
        };
        loadChunk();
      })
    } catch (e) {
      throw e
    }
  }

  public async encryptFileData(data: Uint8Array, publicKey: string) {
    try {
      const AESKEY = await EncryptApi.aesKeyGen();
      const AESIv = random(128);
      const encData = AESEncryptApi.AESEncData(
        data,
        AESKEY,
        AESIv
      );
      const encryptedAesKey = await RSAEncryptApi.encryptMessage(
        publicKey,
        `${AESKEY}${AESIv}`
      );
      return {encData, encryptedAesKey}
    } catch (e) {
      throw e
    }
  }

  public async put_encrypt_files(files: File[], is_private: boolean, publicKey: string): Promise<string[]> {
    try {
      const Actor = this.DataBoxActor
      const keyArr: Array<string> = []
      const allPromise: Array<any> = []
      for (const file of files) {
        const key = nanoid()
        keyArr.push(key)
        const total_size = file.size
        const allData = await this.FileRead(file)
        const data = new Uint8Array(total_size)
        for (let i = 0; i < allData.length; i++) {
          data.set(allData[i], i * chunkSize)
        }
        const {encData, encryptedAesKey} = await this.encryptFileData(data, publicKey)
        const NewBlob = new Blob([encData])
        const encryptedData = await this.FileRead(NewBlob)
        for (let i = 0; i < encryptedData.length; i++) {
          const arg: FilePut = {
            EncryptFilePut: {
              IC: {
                file_extension: file.type,
                order: BigInt(i),
                chunk_number: BigInt(Math.ceil(NewBlob.size / chunkSize)),
                chunk: {data: encryptedData[i]},
                aes_pub_key: [encryptedAesKey],
                file_name: file.name,
                file_key: key,
                total_size: BigInt(NewBlob.size),
                is_private: is_private
              }
            }
          }
          allPromise.push(Actor.put(arg))
        }
      }
      await Promise.all(allPromise)
      return keyArr
    } catch (e) {
      throw e
    }
  }

  static async getFile(decodeArr: any, length: number): Promise<Uint8Array> {
    const File = new Uint8Array(length)
    for (let i = 0; i < decodeArr.length; i++) {
      let slice = decodeArr[i]
      let start = 0
      for (let j = 0; j < i; j++) {
        start += decodeArr[j].length
      }
      File.set(slice, start)
    }
    return File
  }

  private async getData(file_info: any, isEncrypt: boolean): Promise<Array<any>> {
    try {
      const queryPromiseArr: Array<Promise<any>> = []
      if (file_info.ok) {
        const AssetExt = file_info.ok[isEncrypt ? "EncryptFileExt" : "PlainFileExt"]
        if (AssetExt) {
          const need_query_times = Number(AssetExt.need_query_times)
          for (let i = 0; i < need_query_times; i++) {
            queryPromiseArr.push(this.DataBoxActor[isEncrypt ? "getCipher" : "getPlain"]({
              file_key: AssetExt.file_key,
              flag: BigInt(i)
            }))
          }
          return await Promise.all(queryPromiseArr)
        } else throw new Error(`this is not a ${isEncrypt ? "encrypt" : "plain"} file`)
      } else throw new Error(Object.keys(file_info.err)[0])
    } catch (e) {
      throw e
    }
  }

  public async get_plain_file(file_key: string): Promise<Blob> {
    try {
      const dataArr: Array<Array<number>> = []
      let fileSize = 0
      const file_info = await this.get_file_info(file_key) as any
      const fileType = file_info.ok.PlainFileExt.file_extension
      const res = await this.getData(file_info, false)
      if (res[0] && res[0].ok) {
        res.forEach(e => {
          dataArr.push(e.ok)
          fileSize += e.ok.length
        })
        const metadata = await DataBox.getFile(dataArr, fileSize)
        return new Blob([metadata.buffer], {
          type: fileType,
        })
      } else throw new Error(Object.keys(res[0].err)[0])
    } catch (e) {
      throw e
    }
  }

  public async get_encrypt_file(file_key: string, privatekey: string): Promise<Blob> {
    try {
      const dataArr: Array<Array<number>> = []
      let fileSize = 0
      const file_info = await this.get_file_info(file_key) as any
      const fileType = file_info?.ok?.EncryptFileExt.file_extension
      const res = await this.getData(file_info, true)
      if (res[0] && res[0].ok) {
        res.forEach(e => {
          e.ok.forEach(value => {
            dataArr.push(value)
            fileSize += value.length
          })
        })
        const metadata = await DataBox.getFile(dataArr, fileSize)
        const privateKey = await RSAEncryptApi.importPrivateKey(privatekey);
        const preFileAesKey = await RSAEncryptApi.decryptMessage(
          privateKey,
          file_info.ok.EncryptFileExt.aes_pub_key[0]
        );
        const AesKey = preFileAesKey.slice(0, 256);
        const AesIv = preFileAesKey.slice(256);
        const plainText = AESEncryptApi.AESDecData(metadata, AesKey, AesIv);
        return new Blob([plainText.buffer], {
          type: fileType,
        })
      } else throw new Error(Object.keys(res[0].err)[0])

    } catch (e) {
      throw e
    }
  }

  public async delete_ic_plain_file(file_key: string): Promise<Result_1> {
    try {
      return await this.DataBoxActor.deleteFileFromKey(file_key, {'Plain': null}) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async delete_ic_encrypted_file(file_key: string): Promise<Result_1> {
    try {
      return await this.DataBoxActor.deleteFileFromKey(file_key, {'EnCrypt': null}) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async clear_box(): Promise<Result_1> {
    try {
      return await this.DataBoxActor.clearall() as Result_1
    } catch (e) {
      throw e
    }
  }

  public async get_file_info(file_key: string): Promise<Result_2> {
    try {
      return await this.DataBoxActor.getAssetextkey(file_key) as Result_2
    } catch (e) {
      throw e
    }
  }

  public async getVersion(): Promise<bigint> {
    try {
      return await this.DataBoxActor.getVersion() as bigint
    } catch (e) {
      throw e
    }
  }

  public async get_all_files_info(): Promise<Result_9> {
    try {
      return await this.DataBoxActor.getAssetexts() as Result_9
    } catch (e) {
      throw e
    }
  }

  async transferOwner(to: Principal): Promise<Result_1> {
    try {
      return await this.DataBoxActor.transferOwner(to) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async get_owner(): Promise<Principal> {
    try {
      return await this.DataBoxActor.getOwner() as Principal
    } catch (e) {
      throw e
    }
  }

  public async setPlainFilePubOrPri(changePlainFilePermissionArg: changePlainFilePermissionArg): Promise<Result_1> {
    try {
      return await this.DataBoxActor.setPlainFilePubOrPri(changePlainFilePermissionArg.file_key, changePlainFilePermissionArg.is_private) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async addPrivatePlainShare(shareFileArg: shareFileArg): Promise<Result_1> {
    try {
      return await this.DataBoxActor.addPrivatePlainShare(shareFileArg.file_key, shareFileArg.to) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async removePrivatePlainShare(shareFileArg: shareFileArg): Promise<Result_1> {
    try {
      return await this.DataBoxActor.removePrivatePlainShare(shareFileArg.file_key, shareFileArg.to) as Result_1
    } catch (e) {
      throw e
    }
  }

  public async getShareFiles(): Promise<Result_3> {
    try {
      return await this.DataBoxActor.getShareFiles() as Result_3
    } catch (e) {
      throw e
    }
  }

  public async is_need_upgrade(): Promise<boolean> {
    try {
      const MBapi = new MetaBox(this.agent)
      const version = Number(await this.getVersion())
      const new_version = Number(await MBapi.getDataBoxVersion())
      return version < new_version
    } catch (e) {
      throw e
    }
  }

  public async is_enough_to_upload(total_size: number): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const res = await this.cycleBalance()
        if (Object.keys(res)[0] === "ok") {//@ts-ignore
          const balance = Number(res.ok)
          if (total_size * ONE_BYTE_UPLOAD_USE_CYCLES < balance) {
            return resolve(true)
          } else return reject(Number(total_size * ONE_BYTE_UPLOAD_USE_CYCLES - balance))
          //@ts-ignore
        } else return reject(String(Object.keys(res.err)[0]))
      } catch (e) {
        return reject(e)
      }
    })
  }

}
