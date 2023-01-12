export const idlFactory = ({IDL}) => {
  const Error = IDL.Variant({
    'NoFreeBoxNum': IDL.Null,
    'NoUnBoundOg': IDL.Null,
    'Named': IDL.Null,
    'NoBox': IDL.Null,
    'DataBoxNotExist': IDL.Null,
    'OnlyDataBoxCanDeleted': IDL.Null,
    'BalanceNotEnough': IDL.Null,
    'NameRepeat': IDL.Null,
    'UnAuthorized': IDL.Null,
    'DataBoxEnough': IDL.Null,
    'DataBoxNotShareTo': IDL.Null,
    'CreateBoxOnWay': IDL.Null,
    'SomethingErr': IDL.Null,
    'LedgerTransferError': IDL.Nat,
    'Invalid_Operation': IDL.Null,
    'NotBoxOwner': IDL.Null,
    'NoProfile': IDL.Null,
    'ProfileEnough': IDL.Null,
    'NotifyCreateError': IDL.Nat,
  });
  const Result = IDL.Variant({'ok': IDL.Null, 'err': Error});
  const BurnError = IDL.Variant({
    'InsufficientBalance': IDL.Null,
    'InvalidTokenContract': IDL.Null,
    'NotSufficientLiquidity': IDL.Null,
  });
  const RustResult = IDL.Variant({'Ok': IDL.Nat64, 'Err': BurnError});
  const BoxType = IDL.Variant({
    'xid': IDL.Null,
    'data_box': IDL.Null,
    'profile': IDL.Null,
  });
  const BoxMetadata = IDL.Record({
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const CreateBoxArgs = IDL.Record({'metadata': BoxMetadata});
  const Result_5 = IDL.Variant({'ok': IDL.Principal, 'err': Error});
  const DelBoxArgs = IDL.Record({
    'cycleTo': IDL.Opt(IDL.Principal),
    'box_type': BoxType,
    'canisterId': IDL.Principal,
  });
  const Result_4 = IDL.Variant({'ok': IDL.Text, 'err': Error});
  const BoxStatus = IDL.Variant({'stopped': IDL.Null, 'running': IDL.Null});
  const BoxState__1 = IDL.Record({
    'status': BoxStatus,
    'owner': IDL.Principal,
    'avatar_key': IDL.Text,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const BackUp = IDL.Variant({
    'One': IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(IDL.Principal))),
    'Six': IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Text)),
    'Two': IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat)),
    'Seven': IDL.Vec(IDL.Principal),
    'Five': IDL.Vec(IDL.Tuple(IDL.Text, IDL.Principal)),
    'Four': IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Principal)),
    'Three': IDL.Vec(IDL.Tuple(IDL.Principal, BoxState__1)),
  });
  const BoxState = IDL.Record({
    'status': BoxStatus,
    'owner': IDL.Principal,
    'avatar_key': IDL.Text,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const Result_3 = IDL.Variant({'ok': BoxState, 'err': Error});
  const BoxAllInfo = IDL.Record({
    'status': BoxStatus,
    'owner': IDL.Principal,
    'avatar_key': IDL.Text,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const Result_2 = IDL.Variant({
    'ok': IDL.Vec(IDL.Principal),
    'err': Error,
  });
  const BoxInfo__1 = IDL.Record({
    'status': BoxStatus,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const TopUpArgs = IDL.Record({
    'box_id': IDL.Principal,
    'icp_amount': IDL.Nat64,
  });
  const UpdateWasmArgs = IDL.Record({
    'wasm': IDL.Vec(IDL.Nat8),
    'box_type': BoxType,
  });
  const Result_1 = IDL.Variant({'ok': IDL.Text, 'err': IDL.Text});
  const BoxInfo = IDL.Record({
    'status': BoxStatus,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const UpgradeBoxArgs = IDL.Record({'info': BoxInfo});
  const MetaBox = IDL.Service({
    'acceptSharedBox': IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    'addAdmin': IDL.Func([IDL.Principal], [IDL.Bool], []),
    'addControlWhiteList': IDL.Func([IDL.Principal], [IDL.Bool], []),
    'burnxtc': IDL.Func([IDL.Nat], [RustResult], []),
    'changeAdmin': IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Bool], []),
    'changeBoxAvatarKey': IDL.Func([IDL.Text], [], []),
    'clearLog': IDL.Func([], [], []),
    'createDataBoxControl': IDL.Func(
      [CreateBoxArgs, IDL.Bool, IDL.Opt(IDL.Principal)],
      [Result_5],
      [],
    ),
    'createDataBoxFee': IDL.Func([CreateBoxArgs, IDL.Bool], [Result_5], []),
    'createDataBoxFree': IDL.Func([CreateBoxArgs], [Result_5], []),
    'createProfile': IDL.Func([IDL.Vec(IDL.Nat8)], [Result_5], []),
    'deleteBox': IDL.Func([DelBoxArgs], [Result_4], []),
    'emitShareBox': IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    'getAdmins': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getBackUp': IDL.Func([IDL.Nat], [BackUp], ['query']),
    'getBoxState': IDL.Func([IDL.Principal], [Result_3], ['query']),
    'getBoxes': IDL.Func([IDL.Principal], [IDL.Vec(BoxAllInfo)], ['query']),
    'getCycleBalance': IDL.Func([], [IDL.Nat64], ['query']),
    'getDataBoxVersion': IDL.Func([], [IDL.Nat], ['query']),
    'getIcp': IDL.Func([], [IDL.Nat64], []),
    'getLog': IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text))], ['query']),
    'getNameFromPrincipal': IDL.Func(
      [IDL.Principal],
      [IDL.Opt(IDL.Text)],
      ['query'],
    ),
    'getNamePrin': IDL.Func([IDL.Principal], [IDL.Opt(IDL.Text)], ['query']),
    'getPre': IDL.Func([], [IDL.Nat, IDL.Nat], ['query']),
    'getPrincipalFromName': IDL.Func(
      [IDL.Text],
      [IDL.Opt(IDL.Principal)],
      ['query'],
    ),
    'getProfile': IDL.Func(
      [IDL.Principal],
      [IDL.Opt(IDL.Principal)],
      ['query'],
    ),
    'getProfileVersion': IDL.Func([], [IDL.Nat], ['query']),
    'getShareBoxes': IDL.Func([], [IDL.Vec(BoxAllInfo)], ['query']),
    'getSharedBoxes': IDL.Func([], [IDL.Vec(BoxAllInfo)], ['query']),
    'getTotal': IDL.Func([], [IDL.Nat, IDL.Nat], ['query']),
    'getUserBalance': IDL.Func([], [IDL.Opt(IDL.Nat)], ['query']),
    'initPreCreateDatabox': IDL.Func([], [Result_2], []),
    'initPreCreateProfile': IDL.Func([], [Result_2], []),
    'installCycleWasm': IDL.Func([IDL.Vec(IDL.Nat8)], [Result], []),
    'isNotFirstDataBox': IDL.Func([], [IDL.Bool], ['query']),
    'preCreateDataBox': IDL.Func([], [Result_2], []),
    'preCreateDataBoxOne': IDL.Func([], [Result], []),
    'preCreateProfile': IDL.Func([], [Result_2], []),
    'preCreateProfileOne': IDL.Func([], [Result_2], []),
    'refreshBalance': IDL.Func([IDL.Principal], [], []),
    'removeShareBox': IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    'removeSharedBox': IDL.Func([IDL.Principal, IDL.Principal], [Result], []),
    'selfburn': IDL.Func([IDL.Nat], [RustResult], []),
    'setName': IDL.Func([IDL.Text], [Result], []),
    'startBox': IDL.Func([BoxInfo__1], [], []),
    'stopBox': IDL.Func([BoxInfo__1], [], []),
    'topUpBox': IDL.Func([TopUpArgs], [Result], []),
    'transferDataboxOwner': IDL.Func(
      [IDL.Principal, IDL.Principal],
      [Result],
      [],
    ),
    'updateBoxInfo': IDL.Func([BoxInfo__1], [Result], []),
    'updateDataBoxVersion': IDL.Func([IDL.Nat], [IDL.Bool], []),
    'updateProfileVersion': IDL.Func([IDL.Nat], [IDL.Bool], []),
    'updateWasm': IDL.Func([UpdateWasmArgs], [Result_1], []),
    'upgradeBox': IDL.Func([UpgradeBoxArgs], [Result], []),
    'wallet_receive': IDL.Func([], [], []),
    'xdrUpdate': IDL.Func([], [IDL.Bool], []),
  });
  return MetaBox;
};
export const init = ({IDL}) => {
  return [];
};
