import type {Principal} from '@dfinity/principal';
import type {ActorMethod} from '@dfinity/agent';

export interface BoxInfo {
  'status': BoxStatus,
  'canister_id': Principal,
  'is_private': boolean,
  'box_name': string,
  'box_type': BoxType,
}

export interface BoxInfo__1 {
  'status': BoxStatus,
  'canister_id': Principal,
  'is_private': boolean,
  'box_name': string,
  'box_type': BoxType,
}

export interface BoxMetadata {
  'is_private': boolean,
  'box_name': string,
  'box_type': BoxType,
}

export type BoxStatus = { 'stopped': null } |
  { 'running': null };
export type BoxType = { 'xid': null } |
  { 'data_box': null } |
  { 'profile': null };

export interface CreateBoxArgs {
  'metadata': BoxMetadata,
  'install_args': Array<number>,
  'icp_amount': bigint,
}

export interface DelBoxArgs {
  'cycleTo': [] | [Principal],
  'box_type': BoxType,
  'canisterId': Principal,
}

export type Error = { 'Named': null } |
  { 'NoBox': null } |
  { 'OnlyDataBoxCanDeleted': null } |
  { 'NameRepeat': null } |
  { 'UnAuthorized': null } |
  { 'SomethingErr': null } |
  { 'LedgerTransferError': bigint } |
  { 'Invalid_Operation': null } |
  { 'NotifyCreateError': bigint };

export interface MetaBox {
  'changeAdmin': ActorMethod<[Array<Principal>], boolean>,
  'clearLog': ActorMethod<[], undefined>,
  'createBox': ActorMethod<[CreateBoxArgs], Result_3>,
  'createXid': ActorMethod<[], Principal>,
  'deleteBox': ActorMethod<[DelBoxArgs], Result_2>,
  'getAdmins': ActorMethod<[], Array<Principal>>,
  'getBoxes': ActorMethod<[Principal], Array<BoxInfo__1>>,
  'getLog': ActorMethod<[], Array<[bigint, string]>>,
  'getNameFromPrincipal': ActorMethod<[Principal], [] | [string]>,
  'getPrincipalFromName': ActorMethod<[string], [] | [Principal]>,
  'getProfile': ActorMethod<[Principal], [] | [Principal]>,
  'getXid': ActorMethod<[], [] | [Principal]>,
  'installCycleWasm': ActorMethod<[Array<number>], Result>,
  'mintBox': ActorMethod<[Principal, Array<number>], string>,
  'setName': ActorMethod<[string], Result>,
  'startBox': ActorMethod<[BoxInfo__1], undefined>,
  'stopBox': ActorMethod<[BoxInfo__1], undefined>,
  'topUpBox': ActorMethod<[TopUpArgs], Result>,
  'updateBoxInfo': ActorMethod<[BoxInfo__1], Result>,
  'update_wasm': ActorMethod<[UpdateWasmArgs], Result_1>,
  'upgradeBox': ActorMethod<[UpgradeBoxArgs], Result>,
  'wallet_receive': ActorMethod<[], undefined>,
}

export type Result = { 'ok': null } |
  { 'err': Error };
export type Result_1 = { 'ok': string } |
  { 'err': string };
export type Result_2 = { 'ok': string } |
  { 'err': Error };
export type Result_3 = { 'ok': Principal } |
  { 'err': Error };

export interface TopUpArgs {
  'box_id': Principal,
  'icp_amount': bigint
}

export interface UpdateWasmArgs {
  'wasm': Array<number>,
  'box_type': BoxType
}

export interface UpgradeBoxArgs {
  'info': BoxInfo,
  'install_args': Array<number>,
}

export interface _SERVICE extends MetaBox {
}
