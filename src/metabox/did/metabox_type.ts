import type {Principal} from '@dfinity/principal';
import type {ActorMethod} from '@dfinity/agent';

export type AccountIdentifier = Uint8Array;
export type AssocList = [] | [[[Key, null], List]];
export type BlockIndex = bigint;
export type BlockIndex__1 = bigint;

export interface BoxAllInfo {
  'status': BoxStatus,
  'owner': Principal,
  'avatar_key': string,
  'canister_id': Principal,
  'is_private': boolean,
  'box_name': string,
  'box_type': BoxType,
}

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
  'avatar_key': string,
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

export type Error = { 'NoUnBoundOg': null } |
  { 'Named': null } |
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
  { 'NoProfile': null } |
  { 'ProfileEnough': null } |
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
  'acceptSharedBox': ActorMethod<[Principal, Principal], Result>,
  'addAdmin': ActorMethod<[Principal], boolean>,
  'boundOgDataboxOwner': ActorMethod<[Principal, Principal], Result>,
  'changeAdmin': ActorMethod<[Array<Principal>], boolean>,
  'changeBoxAvatarKey': ActorMethod<[string], undefined>,
  'clearLog': ActorMethod<[], undefined>,
  'createDataBox': ActorMethod<[CreateBoxArgs, Uint8Array], Result_3>,
  'createProfile': ActorMethod<[Uint8Array], Result_3>,
  'createXid': ActorMethod<[Uint8Array], Principal>,
  'deleteBox': ActorMethod<[DelBoxArgs], Result_6>,
  'emitShareBox': ActorMethod<[Principal, Principal], Result>,
  'getAdmins': ActorMethod<[], Array<Principal>>,
  'getBoxState': ActorMethod<[Principal], Result_5>,
  'getBoxes': ActorMethod<[Principal], Array<BoxAllInfo>>,
  'getCycleBalance': ActorMethod<[], bigint>,
  'getDataBoxVersion': ActorMethod<[], bigint>,
  'getIcp': ActorMethod<[], bigint>,
  'getLog': ActorMethod<[], Array<[bigint, string]>>,
  'getNameFromPrincipal': ActorMethod<[Principal], [] | [string]>,
  'getOGBoxes': ActorMethod<[], Array<BoxInfo__1>>,
  'getOGNum': ActorMethod<[], bigint>,
  'getOGPreBoxes': ActorMethod<[Principal], Array<BoxInfo__1>>,
  'getOGUpBoxes': ActorMethod<[Principal], Array<BoxInfo__1>>,
  'getPre': ActorMethod<[], [bigint, bigint]>,
  'getPrincipalFromName': ActorMethod<[string], [] | [Principal]>,
  'getProfile': ActorMethod<[Principal], [] | [Principal]>,
  'getProfileVersion': ActorMethod<[], bigint>,
  'getShareBoxes': ActorMethod<[], Array<BoxAllInfo>>,
  'getSharedBoxes': ActorMethod<[], Array<BoxAllInfo>>,
  'getTotal': ActorMethod<[], [bigint, bigint]>,
  'getUserOgBox': ActorMethod<[], Array<[Principal, Set]>>,
  'getUserPreBox': ActorMethod<[], Array<[Principal, Set]>>,
  'getXid': ActorMethod<[Principal], [] | [Principal]>,
  'initPreCreateDatabox': ActorMethod<[], Result_4>,
  'initPreCreateProfile': ActorMethod<[], Result_4>,
  'installCycleWasm': ActorMethod<[Uint8Array], Result>,
  'preCreateDataBox': ActorMethod<[], Result_4>,
  'preCreateDataBoxOne': ActorMethod<[], Result>,
  'preCreateProfile': ActorMethod<[], Result_4>,
  'preCreateProfileOne': ActorMethod<[], Result_4>,
  'recoverOG': ActorMethod<[Principal], undefined>,
  'removeShareBox': ActorMethod<[Principal, Principal], Result>,
  'removeSharedBox': ActorMethod<[Principal, Principal], Result>,
  'setName': ActorMethod<[string], Result>,
  'slowCreateDataBoxOne': ActorMethod<[CreateBoxArgs], Result_3>,
  'startBox': ActorMethod<[BoxInfo__1], undefined>,
  'stopBox': ActorMethod<[BoxInfo__1], undefined>,
  'topUpBox': ActorMethod<[TopUpArgs], Result>,
  'transferDataboxOwner': ActorMethod<[Principal, Principal], Result>,
  'transferOutICP': ActorMethod<[AccountIdentifier, bigint], Result_2>,
  'updateBoxInfo': ActorMethod<[BoxInfo__1], Result>,
  'updateDataBoxVersion': ActorMethod<[bigint], boolean>,
  'updateProfileVersion': ActorMethod<[bigint], boolean>,
  'updateWasm': ActorMethod<[UpdateWasmArgs], Result_1>,
  'updateWasmOnce': ActorMethod<[Uint8Array], Result_1>,
  'updateWasmTwice': ActorMethod<[Uint8Array], Result_1>,
  'upgradeBox': ActorMethod<[UpgradeBoxArgs], Result>,
  'upgradeBoxOnce': ActorMethod<[UpgradeBoxArgs], Result>,
  'upgradeBoxTwice': ActorMethod<[UpgradeBoxArgs], Result>,
  'wallet_receive': ActorMethod<[], undefined>,
  'xdrUpdate': ActorMethod<[], boolean>,
}

export type Result = { 'ok': null } |
  { 'err': Error };
export type Result_1 = { 'ok': string } |
  { 'err': string };
export type Result_2 = { 'ok': BlockIndex__1 } |
  { 'err': TransferError };
export type Result_3 = { 'ok': Principal } |
  { 'err': Error };
export type Result_4 = { 'ok': Array<Principal> } |
  { 'err': Error };
export type Result_5 = { 'ok': BoxState } |
  { 'err': Error };
export type Result_6 = { 'ok': string } |
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
  'wasm': Uint8Array,
  'box_type': BoxType
}

export interface UpgradeBoxArgs {
  'info': BoxInfo
}

export interface _SERVICE extends MetaBox {
}
