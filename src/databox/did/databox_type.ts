import type {Principal} from '@dfinity/principal';
import type {ActorMethod} from '@dfinity/agent';

export interface AssetExt {
  'file_extension': string,
  'share_other': Array<Principal>,
  'upload_status': boolean,
  'bucket_id': Principal,
  'owner': Principal,
  'aes_pub_key': [] | [string],
  'is_private': boolean,
  'file_name': string,
  'file_key': string,
  'total_size': bigint,
  'page_field': FieldLocation,
  'create_time': Time,
  'need_query_times': bigint,
}

export interface Avatar {
  'data': Array<number> | Uint8Array,
  'data_type': string
}

export interface Chunk {
  'data': Array<number> | Uint8Array
}

export interface DataBox {
  'addCon': ActorMethod<[Principal], Result_1>,
  'addPrivatePlainShare': ActorMethod<[string, Principal], Result_1>,
  'avlSM': ActorMethod<[], Result_11>,
  'canisterState': ActorMethod<[], Result_10>,
  'clearBuffer': ActorMethod<[], undefined>,
  'clearall': ActorMethod<[], Result_1>,
  'curControl': ActorMethod<[], [Principal, Array<Principal>]>,
  'cycleBalance': ActorMethod<[], Result_7>,
  'deleteCon': ActorMethod<[Principal], Result_1>,
  'deleteFileFromKey': ActorMethod<[string, FileLocation], Result_1>,
  'deleteShareFile': ActorMethod<[string, Principal], Result_1>,
  'deleteSharedFile': ActorMethod<[string], Result_1>,
  'getAssetextkey': ActorMethod<[string], Result_2>,
  'getAssetexts': ActorMethod<[], Result_9>,
  'getCipher': ActorMethod<[GET], Result_8>,
  'getDefaultDeviceShareDap': ActorMethod<[string], Result_1>,
  'getFileNums': ActorMethod<[FileLocation], Result_7>,
  'getFileShareOther': ActorMethod<[string], Result_6>,
  'getOwner': ActorMethod<[], Principal>,
  'getPageFiles': ActorMethod<[FileLocation, bigint, bigint], Result_5>,
  'getPlain': ActorMethod<[GET], Result_4>,
  'getShareFiles': ActorMethod<[], Result_3>,
  'getSharedAesPublic': ActorMethod<[string], Result_1>,
  'getVersion': ActorMethod<[], bigint>,
  'http_request': ActorMethod<[HttpRequest], HttpResponse>,
  'put': ActorMethod<[FilePut], Result_2>,
  'removePrivatePlainShare': ActorMethod<[string, Principal], Result_1>,
  'setPlainFilePubOrPri': ActorMethod<[string, boolean], Result_1>,
  'setShareFile': ActorMethod<[string, Principal, string], Result_1>,
  'streamingCallback': ActorMethod<[StreamingToken],
    StreamingCallbackHttpResponse>,
  'transferOwner': ActorMethod<[Principal], Result_1>,
  'uploadAvatar': ActorMethod<[Avatar, string], Result>,
  'wallet_receive': ActorMethod<[], bigint>,
}

export type DataErr = { 'FileKeyErr': null } |
  { 'FilePublic': null } |
  { 'BlobSizeError': null } |
  { 'PermissionDenied': null } |
  { 'SharedRepeat': null } |
  { 'FlagErr': null } |
  { 'SharedNotSet': null } |
  { 'MemoryInsufficient': null } |
  { 'FileAesPubKeyNotExist': null } |
  { 'UserAccessErr': null } |
  { 'FileLocationErr': null } |
  { 'FileRepeat': null } |
  { 'ShareRepeat': null };
export type FieldLocation = { 'ICEnCrypt': Array<Array<[bigint, bigint]>> } |
  { 'IPFS': string } |
  { 'Arweave': string } |
  { 'ICFlag': null } |
  { 'ICPlain': Array<[bigint, bigint]> };
export type FileExt = { 'EncryptFileExt': AssetExt } |
  {
    'SharedFileExt': {
      'file_extension': string,
      'other': Principal,
      'description': string,
      'file_name': string,
      'file_key': string,
      'page_field': FieldLocation,
      'create_time': Time,
      'isPublic': boolean,
      'receiver': Principal,
    }
  } |
  { 'PlainFileExt': AssetExt };
export type FileLocation = { 'All': null } |
  { 'EnCrypt': null } |
  { 'Shared': null } |
  { 'Plain': null };
export type FilePut = { 'EncryptFilePut': PUT } |
  {
    'SharedFilePut': {
      'file_extension': string,
      'other': Principal,
      'aes_pub_key': [] | [string],
      'description': string,
      'file_name': string,
      'file_key': string,
      'page_field': FieldLocation,
      'isPublic': boolean,
    }
  } |
  { 'PlainFilePut': PUT };

export interface GET {
  'flag': bigint,
  'file_key': string
}

export type HeaderField = [string, string];

export interface HttpRequest {
  'url': string,
  'method': string,
  'body': Array<number>,
  'headers': Array<HeaderField>,
}

export interface HttpResponse {
  'body': Array<number>,
  'headers': Array<HeaderField>,
  'streaming_strategy': [] | [StreamingStrategy],
  'status_code': number,
}

export type PUT = {
  'IC': {
    'file_extension': string,
    'order': bigint,
    'chunk_number': bigint,
    'chunk': Chunk,
    'aes_pub_key': [] | [string],
    'is_private': boolean,
    'file_name': string,
    'file_key': string,
    'total_size': bigint,
  }
} |
  {
    'Other': {
      'file_extension': string,
      'aes_pub_key': [] | [string],
      'is_private': boolean,
      'file_name': string,
      'file_key': string,
      'total_size': bigint,
      'page_field': FieldLocation,
    }
  };
export type Result = { 'ok': null } |
  { 'err': DataErr };
export type Result_1 = { 'ok': string } |
  { 'err': DataErr };
export type Result_10 = { 'ok': State } |
  { 'err': DataErr };
export type Result_11 = { 'ok': bigint } |
  { 'err': DataErr };
export type Result_2 = { 'ok': FileExt } |
  { 'err': DataErr };
export type Result_3 = { 'ok': [Array<FileExt>, Array<FileExt>] } |
  { 'err': DataErr };
export type Result_4 = { 'ok': Array<number> } |
  { 'err': DataErr };
export type Result_5 = { 'ok': Array<FileExt> } |
  { 'err': DataErr };
export type Result_6 = { 'ok': Array<Principal> } |
  { 'err': DataErr };
export type Result_7 = { 'ok': bigint } |
  { 'err': DataErr };
export type Result_8 = { 'ok': Array<Array<number>> } |
  { 'err': DataErr };
export type Result_9 = {
  'ok': [Array<FileExt>, Array<FileExt>, Array<FileExt>]
} |
  { 'err': DataErr };

export interface State {
  'balance': bigint,
  'memory_size': bigint,
  'stable_memory_size': bigint,
}

export interface StreamingCallbackHttpResponse {
  'token': [] | [StreamingToken__1],
  'body': Array<number>,
}

export interface StreamingCallbackHttpResponse__1 {
  'token': [] | [StreamingToken__1],
  'body': Array<number>,
}

export type StreamingStrategy = {
  'Callback': {
    'token': StreamingToken__1,
    'callback': [Principal, string],
  }
};

export interface StreamingToken {
  'key': string,
  'index': bigint
}

export interface StreamingToken__1 {
  'key': string,
  'index': bigint
}

export type Time = bigint;

export interface _SERVICE extends DataBox {
}
