import {Principal} from "@dfinity/principal";

export type FileType = "EncryptFileExt" | "PlainFileExt"
export type PutType = "EncryptFilePut" | "PlainFilePut"
export type changePlainFilePermissionArg = {
  file_key: string
  is_private: boolean
}

export type shareFileArg = {
  file_key: string
  to: Principal
}
