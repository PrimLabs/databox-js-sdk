import {RSAEncryptApi} from "./RSAEncrypt";
import {AESEncryptApi} from "./AESEncrypt";

class Encrypt {

  async aesKeyGen() {
    let aesKey: string = ""
    const array = new BigUint64Array(16)
    window.crypto.getRandomValues(array)
    array.forEach(v => {
      aesKey += v.toString(16)
    })
    while (aesKey.length < 256) aesKey += "0"
    return aesKey
  }

  async genRSAKey(): Promise<{ privateKey: string, publicKey: string }> {
    try {
      const keyPair = await RSAEncryptApi.generateKey()
      const pemPrivateKey = await RSAEncryptApi.exportCryptoKey(keyPair.privateKey)
      const pemPublicKey = await RSAEncryptApi.publicExportCryptoKey(keyPair.publicKey)
      return {
        privateKey: pemPrivateKey,
        publicKey: pemPublicKey
      }
    } catch (e) {
      throw  e
    }
  }

  async encryptPrivateKey(privateKey: string, passwordHash: string, Iv: string): Promise<string> {
    try {
      const u8 = await AESEncryptApi.AESEncData(
        privateKey,
        passwordHash,
        Iv
      )
      return String.fromCharCode.apply(
        null,
        //@ts-ignore
        new Uint8Array(u8)
      )
    } catch (e) {
      throw e
    }
  }

  async decryptPrivateKey(prePrivateKey: string, passwordHash: string, Iv: string) {
    try {
      const buf = new ArrayBuffer(prePrivateKey.length);
      const bufView = new Uint8Array(buf);
      for (
        let i = 0, strLen = prePrivateKey.length;
        i < strLen;
        i++
      ) {
        bufView[i] = prePrivateKey.charCodeAt(i);
      }
      const plainText = AESEncryptApi.AESDecData(
        bufView.buffer,
        passwordHash,
        Iv
      )
      return new TextDecoder().decode(plainText)
    } catch (e) {
      throw e
    }
  }
}

export const EncryptApi = new Encrypt()
