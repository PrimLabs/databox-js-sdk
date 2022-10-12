import {idlFactory} from "./did/databox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {FilePut, Result_1, Result_10, Result_11, Result_2, Result_5, Result_9} from "./did/databox_type";
import {nanoid} from "nanoid";

const chunkSize = 1992288

export class DataBox {
  // private readonly agent: HttpAgent
  private readonly DataBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(canisterId: string, agent: HttpAgent) {
    this.DataBoxActor = Actor.createActor(idlFactory, {agent, canisterId})
  }

  public async canisterState(): Promise<Result_11> {
    try {
      return await this.DataBoxActor.canisterState() as Result_11
    } catch (e) {
      throw e
    }
  }

  public async cycleBalance(): Promise<Result_10> {
    try {
      return await this.DataBoxActor.cycleBalance() as Result_10
    } catch (e) {
      throw e
    }
  }

  public async put_plain_files(files: File[]): Promise<Result_2[]> {
    try {
      const keyArr: Array<Result_2> = []
      const Actor = this.DataBoxActor
      const allPromise: Array<Promise<any>> = files.map(file => {
        return new Promise((resolve, reject) => {
          const key = nanoid()
          const total_size = file.size
          const total_index = Math.ceil(total_size / chunkSize)
          let start = 0;
          let currentChunk = 0;
          const allData: Array<Uint8Array> = []
          let blobSlice = //@ts-ignore
            File.prototype.slice ||
            //@ts-ignore
            File.prototype.mozSlice ||
            //@ts-ignore
            File.prototype.webkitSlice;
          let reader = new FileReader();
          reader.onload = async function (e: any) {
            const data = new Uint8Array(e.target.result)
            allData.push(data)
            if (currentChunk === total_index) {
              for (let i = 0; i < allData.length; i++) {
                const arg: FilePut = {
                  PlainFilePut: {
                    segment: {
                      file_extension: file.type,
                      order: BigInt(i),
                      chunk_number: BigInt(total_index),
                      chunk: {data: allData[i]},
                      aes_pub_key: [],
                      file_name: file.name,
                      file_key: key,
                      total_size: BigInt(file.size),
                    }
                  }
                }
                resolve(Actor.put(arg))
              }
            } else loadChunk()
          };
          reader.onerror = (error) => {
            reject(error);
          };
          const loadChunk = () => {
            const end = start + chunkSize;
            currentChunk++;
            reader.readAsArrayBuffer(blobSlice.call(file, start, end));
            start = end;
          };
          loadChunk();
        })
      })
      return await Promise.all(allPromise)
    } catch (e) {
      throw e
    }
  }

  async getFile(decodeArr: any, length: number): Promise<Uint8Array> {
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

  public async get_plain_file(file_key: string) {
    try {
      const queryPromiseArr: Array<Promise<any>> = []
      const dataArr: Array<Array<number>> = []
      let fileSize = 0
      const file_info = await this.get_file_info(file_key) as any
      if (file_info.ok) {
        if (file_info.ok.PlainFileExt) {
          const need_query_times = Number(file_info.ok.PlainFileExt.need_query_times)
          const fileType = file_info.ok.PlainFileExt.file_extension
          for (let i = 0; i < need_query_times; i++) {
            queryPromiseArr.push(this.DataBoxActor.getPlain({file_key, flag: BigInt(i)}))
          }
          const res = (await Promise.all(queryPromiseArr))
          if (res[0] && res[0].ok) {
            res.forEach(e => {
              dataArr.push(e.ok)
              fileSize += e.ok.length
            })
            const metadata = await this.getFile(dataArr, fileSize)
            return new Blob([metadata.buffer], {
              type: fileType,
            })
          } else throw new Error(Object.keys(res[0].err)[0])
        } else throw new Error("this is not a plain file")
      } else throw new Error(Object.keys(file_info.err)[0])
    } catch (e) {
      throw e
    }
  }

  public async delete_file(file_key: string): Promise<Result_1> {
    try {
      return await this.DataBoxActor.deletekey(file_key) as Result_1
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

  public async get_all_files_info(): Promise<Result_9> {
    try {
      return await this.DataBoxActor.getAssetexts() as Result_9
    } catch (e) {
      throw e
    }
  }
}
