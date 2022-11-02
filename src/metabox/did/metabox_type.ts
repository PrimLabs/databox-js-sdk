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

export interface BoxState {
  'status': BoxStatus,
  'owner': Principal,
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
  'metadata': BoxMetadata
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
  { 'DataBoxEnough': null } |
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
  'acceptSharedBox': ActorMethod<[Principal, Principal], Result_1>,
  'addAdmin': ActorMethod<[Principal], boolean>,
  'changeAdmin': ActorMethod<[Array<Principal>], boolean>,
  'clearLog': ActorMethod<[], undefined>,
  'createDataBox': ActorMethod<[CreateBoxArgs], Result_6>,
  'createDataBoxOne': ActorMethod<[CreateBoxArgs], Result_6>,
  'createProfile': ActorMethod<[], Principal>,
  'createXid': ActorMethod<[], Principal>,
  'deleteBox': ActorMethod<[DelBoxArgs], Result_5>,
  'emitShareBox': ActorMethod<[Principal, Principal], Result_1>,
  'getAdmins': ActorMethod<[], Array<Principal>>,
  'getBoxState': ActorMethod<[Principal], Result_4>,
  'getBoxes': ActorMethod<[Principal], Array<BoxInfo__1>>,
  'getLog': ActorMethod<[], Array<[bigint, string]>>,
  'getNameFromPrincipal': ActorMethod<[Principal], [] | [string]>,
  'getPre': ActorMethod<[], bigint>,
  'getPrincipalFromName': ActorMethod<[string], [] | [Principal]>,
  'getProfile': ActorMethod<[Principal], [] | [Principal]>,
  'getShareBoxes': ActorMethod<[], Array<BoxInfo__1>>,
  'getSharedBoxes': ActorMethod<[], Array<BoxInfo__1>>,
  'getUserPreBox': ActorMethod<[], Array<[Principal, Set]>>,
  'getUserWithDraw': ActorMethod<[], Array<[Principal, bigint]>>,
  'getXid': ActorMethod<[], [] | [Principal]>,
  'initPreCreate': ActorMethod<[], Result_3>,
  'installCycleWasm': ActorMethod<[Array<number>], Result_1>,
  'preCreateDataBox': ActorMethod<[], Result_3>,
  'removeShareBox': ActorMethod<[Principal, Principal], Result_1>,
  'removeSharedBox': ActorMethod<[Principal, Principal], Result_1>,
  'setName': ActorMethod<[string], Result_1>,
  'startBox': ActorMethod<[BoxInfo__1], undefined>,
  'stopBox': ActorMethod<[BoxInfo__1], undefined>,
  'topUpBox': ActorMethod<[TopUpArgs], Result_1>,
  'transferDataboxOwner': ActorMethod<[Principal, Principal], Result_1>,
  'transferOutICP': ActorMethod<[AccountIdentifier, bigint], Result>,
  'updateBoxInfo': ActorMethod<[BoxInfo__1], Result_1>,
  'updateWasm': ActorMethod<[UpdateWasmArgs], Result_2>,
  'updateWasmOnce': ActorMethod<[Array<number>], Result_2>,
  'upgradeBox': ActorMethod<[UpgradeBoxArgs], Result_1>,
  'upgradeBoxOnce': ActorMethod<[UpgradeBoxArgs], Result_1>,
  'wallet_receive': ActorMethod<[], undefined>,
  'withdrawOutIcp': ActorMethod<[AccountIdentifier], Result>,
}

export type Result = { 'ok': BlockIndex__1 } |
  { 'err': TransferError };
export type Result_1 = { 'ok': null } |
  { 'err': Error };
export type Result_2 = { 'ok': string } |
  { 'err': string };
export type Result_3 = { 'ok': Array<Principal> } |
  { 'err': Error };
export type Result_4 = { 'ok': BoxState } |
  { 'err': Error };
export type Result_5 = { 'ok': string } |
  { 'err': Error };
export type Result_6 = { 'ok': Principal } |
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
  'info': BoxInfo
}

export interface _SERVICE extends MetaBox {
}
