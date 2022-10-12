import type {Principal} from '@dfinity/principal';
import type {ActorMethod} from '@dfinity/agent';

export interface AssetExt {
  'file_extension': string,
  'upload_status': boolean,
  'bucket_id': Principal,
  'aes_pub_key': [] | [string],
  'file_name': string,
  'file_key': string,
  'total_size': bigint,
  'need_query_times': bigint,
}

export interface Avatar {
  'data': Array<number>,
  'data_type': string
}

export interface Chunk {
  'data': Array<number>
}

export interface DataBox {
  'avlSM': ActorMethod<[], Result_12>,
  'canisterState': ActorMethod<[], Result_11>,
  'clearall': ActorMethod<[], Result_1>,
  'cycleBalance': ActorMethod<[], Result_10>,
  'deleteShareFile': ActorMethod<[string, Principal], Result_1>,
  'deleteSharedFile': ActorMethod<[string], Result_1>,
  'deletekey': ActorMethod<[string], Result_1>,
  'getAssetextkey': ActorMethod<[string], Result_2>,
  'getAssetexts': ActorMethod<[], Result_9>,
  'getCipher': ActorMethod<[GET], Result_8>,
  'getDefaultDeviceShareDap': ActorMethod<[string], Result_1>,
  'getFailBuffer': ActorMethod<[string], Result_7>,
  'getFileShareOther': ActorMethod<[string], Result_6>,
  'getOwner': ActorMethod<[], Principal>,
  'getPlain': ActorMethod<[GET], Result_5>,
  'getShareFiles': ActorMethod<[], Result_4>,
  'getSharedAesPublic': ActorMethod<[string], Result_1>,
  'getThumbnail': ActorMethod<[string], Result_3>,
  'getVersion': ActorMethod<[], bigint>,
  'http_request': ActorMethod<[HttpRequest], HttpResponse>,
  'put': ActorMethod<[FilePut], Result_2>,
  'setShareFile': ActorMethod<[string, Principal, string], Result_1>,
  'streamingCallback': ActorMethod<[StreamingToken],
    StreamingCallbackHttpResponse>,
  'upload': ActorMethod<[Avatar], Result>,
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
  { 'DeviceNotExist': null } |
  { 'ShareRepeat': null };
export type FileExt = { 'EncryptFileExt': AssetExt } |
  {
    'SharedFileExt': {
      'file_extension': string,
      'other': Principal,
      'description': string,
      'file_name': string,
      'file_key': string,
      'isPublic': boolean,
    }
  } |
  { 'PlainFileExt': AssetExt };
export type FilePut = { 'EncryptFilePut': PUT } |
  {
    'SharedFilePut': {
      'file_extension': string,
      'other': Principal,
      'aes_pub_key': [] | [string],
      'description': string,
      'file_name': string,
      'file_key': string,
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
  'segment': {
    'file_extension': string,
    'order': bigint,
    'chunk_number': bigint,
    'chunk': Chunk,
    'aes_pub_key': [] | [string],
    'file_name': string,
    'file_key': string,
    'total_size': bigint,
  }
} |
  {
    'thumb_nail': {
      'file_extension': string,
      'aes_pub_key': [] | [string],
      'file_name': string,
      'file_key': string,
      'image': Array<number>,
    }
  };
export type Result = { 'ok': null } |
  { 'err': DataErr };
export type Result_1 = { 'ok': string } |
  { 'err': DataErr };
export type Result_10 = { 'ok': bigint } |
  { 'err': DataErr };
export type Result_11 = { 'ok': State } |
  { 'err': DataErr };
export type Result_12 = { 'ok': bigint } |
  { 'err': DataErr };
export type Result_2 = { 'ok': FileExt } |
  { 'err': DataErr };
export type Result_3 = { 'ok': ThumbNail } |
  { 'err': DataErr };
export type Result_4 = { 'ok': Array<FileExt> } |
  { 'err': DataErr };
export type Result_5 = { 'ok': Array<number> } |
  { 'err': DataErr };
export type Result_6 = { 'ok': Array<Principal> } |
  { 'err': DataErr };
export type Result_7 = { 'ok': Array<bigint> } |
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

export interface ThumbNail {
  'file_extension': string,
  'image': Array<number>,
}

export interface _SERVICE extends DataBox {
}
