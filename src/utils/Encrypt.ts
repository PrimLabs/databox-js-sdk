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

}

export const EncryptApi = new Encrypt()
