class RSAEncrypt {
  ab2str(buf) {
    //@ts-ignore
    return String.fromCharCode.apply(null, new Uint8Array(buf))
  }


  str2ab(str) {
    const buf = new ArrayBuffer(str.length)
    const bufView = new Uint8Array(buf)
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i)
    }
    return buf
  }

  //获取RSA秘钥对
  async generateKey() {
    return await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        // Consider using a 4096-bit key for systems that require long-term security
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    )
  }

  //导入RSA秘钥
  async importPrivateKey(pem) {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PRIVATE KEY-----"
    const pemFooter = "-----END PRIVATE KEY-----"
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length
    )
    const binaryDerString = window.atob(pemContents)
    const binaryDer = this.str2ab(binaryDerString)
    return await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["decrypt"]
    )
  }

  async importPublicKey(pem) {
    // fetch the part of the PEM string between header and footer
    const pemHeader = "-----BEGIN PUBLIC KEY-----"
    const pemFooter = "-----END PUBLIC KEY-----"
    const pemContents = pem.substring(
      pemHeader.length,
      pem.length - pemFooter.length
    )
    // base64 decode the string to get the binary data
    const binaryDerString = window.atob(pemContents)
    // convert from a binary string to an ArrayBuffer
    const binaryDer = this.str2ab(binaryDerString)

    return window.crypto.subtle.importKey(
      "spki",
      binaryDer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      true,
      ["encrypt"]
    )
  }

  //导出RSA私钥
  async exportCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey("pkcs8", key)
    const exportedAsString = this.ab2str(exported)
    const exportedAsBase64 = window.btoa(exportedAsString)
    return `-----BEGIN PRIVATE KEY-----${exportedAsBase64}-----END PRIVATE KEY-----`
  }

  //
  async publicExportCryptoKey(key) {
    const exported = await window.crypto.subtle.exportKey("spki", key)
    const exportedAsString = this.ab2str(exported)
    const exportedAsBase64 = window.btoa(exportedAsString)
    return `-----BEGIN PUBLIC KEY-----${exportedAsBase64}-----END PUBLIC KEY-----`
  }

  //加密AES秘钥
  async encryptMessage(key, AESKey) {
    let enc = new TextEncoder()
    let encoded = enc.encode(AESKey)
    const Key = await this.importPublicKey(key)
    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      Key,
      encoded
    )
    const exportedAsString = this.ab2str(ciphertext)
    return window.btoa(exportedAsString)
  }

  //解密AES秘钥
  async decryptMessage(key, cipherText) {
    const binaryDerString = window.atob(cipherText)
    const ciphertext = this.str2ab(binaryDerString)
    let decrypted = await window.crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      ciphertext
    )

    let dec = new TextDecoder()
    return dec.decode(decrypted)
  }
}

export const RSAEncryptApi = new RSAEncrypt()
