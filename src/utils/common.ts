import {Buffer} from "buffer";

export const ArrayToHexString = (byteArray: number[]) => {
  return Array.from(byteArray, function (byte) {
    return ("0" + (byte & 0xff).toString(16)).slice(-2);
  }).join("");
};

export const getUint8ArrayFromHex = (str) => {
  return Uint8Array.from(Buffer.from(str, "hex"));
};

export const retry = async <T>(promise_arr: (() => Promise<T>)[], maxRetries: number, success_arr: T[] = new Array(promise_arr.length).fill(undefined)): Promise<T[]> => {
  const all_promise: Promise<T>[] = []
  const new_arr: (() => Promise<T>)[] = []
  for (let i = 0; i < promise_arr.length; i++) {
    all_promise.push(promise_arr[i]())
  }
  const res = await Promise.allSettled(all_promise)
  for (let i = 0; i < res.length; i++) {
    const item = res[i]
    if (item.status === "fulfilled") success_arr[i] = item.value
    else new_arr.push(promise_arr[i])
  }
  if (success_arr.every(e => !!e)) return success_arr
  if (maxRetries === 0) throw new Error("执行错误")
  maxRetries--;
  return await retry(new_arr, maxRetries, success_arr)
}
