import {BoxMetadata} from "./metabox/did/metabox_type";

export type createBoxArg = {
  BoxMetadata: BoxMetadata,
  'icp_amount': number
}

export type FileType = "EncryptFileExt" | "SharedFileExt" | "PlainFileExt"
