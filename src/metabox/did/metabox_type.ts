import type {Principal} from '@dfinity/principal';
import type {ActorMethod} from '@dfinity/agent';

export type AccountIdentifier = Array<number>;
export type AssocList = [] | [[[Key, null], List]];
export type BlockIndex = bigint;
export type BlockIndex__1 = bigint;

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

export interface Branch {
  'left': Trie,
  'size': bigint,
  'right': Trie
}

export interface CreateBoxArgs {
  'metadata': BoxMetadata,
  'install_args': Array<number>,
}

export interface DelBoxArgs {
  'cycleTo': [] | [Principal],
  'box_type': BoxType,
  'canisterId': Principal,
}

export type Error = { 'Named': null } |
  { 'NoBox': null } |
  { 'DataBoxNotExist': null } |
  { 'OnlyDataBoxCanDeleted': null } |
  { 'NameRepeat': null } |
  { 'UnAuthorized': null } |
  { 'DataBoxNotShareTo': null } |
  { 'SomethingErr': null } |
  { 'LedgerTransferError': bigint } |
  { 'Invalid_Operation': null } |
  { 'NotBoxOwner': null } |
  { 'NotifyCreateError': bigint };
export type Hash = number;

export interface Key {
  'key': BoxInfo__1,
  'hash': Hash
}

export interface Leaf {
  'size': bigint,
  'keyvals': AssocList
}

export type List = [] | [[[Key, null], List]];

export interface MetaBox {
  'acceptSharedBox': ActorMethod<[Principal, Principal], Result_2>,
  'addAdmin': ActorMethod<[Principal], boolean>,
  'changeAdmin': ActorMethod<[Array<Principal>], boolean>,
  'clearLog': ActorMethod<[], undefined>,
  'createDataBox': ActorMethod<[CreateBoxArgs], Result_5>,
  'createProfile': ActorMethod<[], Principal>,
  'createXid': ActorMethod<[], Principal>,
  'deleteBox': ActorMethod<[DelBoxArgs], Result_4>,
  'emitShareBox': ActorMethod<[Principal, Principal], Result_2>,
  'getAdmins': ActorMethod<[], Array<Principal>>,
  'getBoxes': ActorMethod<[Principal], Array<BoxInfo__1>>,
  'getLog': ActorMethod<[], Array<[bigint, string]>>,
  'getNameFromPrincipal': ActorMethod<[Principal], [] | [string]>,
  'getPrincipalFromName': ActorMethod<[string], [] | [Principal]>,
  'getProfile': ActorMethod<[Principal], [] | [Principal]>,
  'getShareBoxes': ActorMethod<[], Array<BoxInfo__1>>,
  'getSharedBoxes': ActorMethod<[], Array<BoxInfo__1>>,
  'getUserPreBox': ActorMethod<[], Array<[Principal, Set]>>,
  'getUserWithDraw': ActorMethod<[], Array<[Principal, bigint]>>,
  'getXid': ActorMethod<[], [] | [Principal]>,
  'installCycleWasm': ActorMethod<[Array<number>], Result_2>,
  'removeShareBox': ActorMethod<[Principal, Principal], Result_2>,
  'removeSharedBox': ActorMethod<[Principal, Principal], Result_2>,
  'setName': ActorMethod<[string], Result_2>,
  'startBox': ActorMethod<[BoxInfo__1], undefined>,
  'stopBox': ActorMethod<[BoxInfo__1], undefined>,
  'topUpBox': ActorMethod<[TopUpArgs], Result_2>,
  'transferOutICP': ActorMethod<[AccountIdentifier, bigint], Result_1>,
  'updateBoxInfo': ActorMethod<[BoxInfo__1], Result_2>,
  'updateWasm': ActorMethod<[UpdateWasmArgs], Result_3>,
  'updateWasmOnce': ActorMethod<[Array<number>], Result_3>,
  'upgradeBox': ActorMethod<[UpgradeBoxArgs], Result_2>,
  'upgradeBoxOnce': ActorMethod<[UpgradeBoxArgs], Result_2>,
  'wallet_receive': ActorMethod<[], undefined>,
  'withdrawOutIcp': ActorMethod<[AccountIdentifier], Result_1>,
  'xdrIcpRate': ActorMethod<[], Result>,
}

export type Result = { 'ok': bigint } |
  { 'err': Error };
export type Result_1 = { 'ok': BlockIndex__1 } |
  { 'err': TransferError };
export type Result_2 = { 'ok': null } |
  { 'err': Error };
export type Result_3 = { 'ok': string } |
  { 'err': string };
export type Result_4 = { 'ok': string } |
  { 'err': Error };
export type Result_5 = { 'ok': Principal } |
  { 'err': Error };
export type Set = { 'branch': Branch } |
  { 'leaf': Leaf } |
  { 'empty': null };

export interface Token {
  'e8s': bigint
}

export interface TopUpArgs {
  'box_id': Principal,
  'icp_amount': bigint
}

export type TransferError = {
  'TxTooOld': { 'allowed_window_nanos': bigint }
} |
  { 'BadFee': { 'expected_fee': Token } } |
  { 'TxDuplicate': { 'duplicate_of': BlockIndex } } |
  { 'TxCreatedInFuture': null } |
  { 'InsufficientFunds': { 'balance': Token } };
export type Trie = { 'branch': Branch } |
  { 'leaf': Leaf } |
  { 'empty': null };

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
