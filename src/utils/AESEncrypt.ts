import CryptoJS from "crypto-js"

class AESEncrypt {
  ArrayBufferToWordArray(arrayBuffer) {
    const u8 = new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
    const len = u8.length;
    const words = new Array<number>();
    for (let i = 0; i < len; i += 1) {
      words[i >>> 2] |= (u8[i] & 0xff) << (24 - (i % 4) * 8);
    }
    return CryptoJS.lib.WordArray.create(words, len);
  }

  WordArrayToArrayBuffer(wordArray) {
    const {words} = wordArray;
    const {sigBytes} = wordArray;
    const u8 = new Uint8Array(sigBytes);
    for (let i = 0; i < sigBytes; i += 1) {
      u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
    }
    return u8;
  }

  AESEncData(metaData, key, iv) {
    let data;
    if (typeof metaData === "string") {
      const enc = new TextEncoder(); // always utf-8
      data = this.ArrayBufferToWordArray(enc.encode(metaData).buffer);
    } else {
      data = this.ArrayBufferToWordArray(metaData);
    }

    // 这里的data是WordBuffer类型的数据
    const bKey = CryptoJS.enc.Hex.parse(key);
    // const bKey = CryptoJS.enc.Utf8.parse(key);
    const bIv = CryptoJS.enc.Hex.parse(iv);
    // const bIv = CryptoJS.enc.Utf8.parse(iv);
    const encrypt = CryptoJS.AES.encrypt(data, bKey, {
      iv: bIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return this.WordArrayToArrayBuffer(encrypt.ciphertext);
  }

  AESDecData(metaData, key, iv) {
    const data = AESEncryptApi.ArrayBufferToWordArray(metaData);
    // 这里的data是WordBuffer类型的数据
    const bKey = CryptoJS.enc.Hex.parse(key);
    // const bKey = CryptoJS.enc.Utf8.parse(key);
    const bIv = CryptoJS.enc.Hex.parse(iv);
    // const bIv = CryptoJS.enc.Utf8.parse(iv);
    //@ts-ignore
    const decrypt = CryptoJS.AES.decrypt({ciphertext: data}, bKey, {
      iv: bIv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return this.WordArrayToArrayBuffer(decrypt);
  }
}

export const AESEncryptApi = new AESEncrypt();
