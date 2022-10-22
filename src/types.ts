import {BoxMetadata} from "./metabox/did/metabox_type";
import {Principal} from "_@dfinity_principal@0.11.3@@dfinity/principal";

export type createBoxArg = {
  BoxMetadata: BoxMetadata,
  'icp_amount': number
}

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
