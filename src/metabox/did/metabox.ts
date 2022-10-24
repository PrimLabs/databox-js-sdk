export const idlFactory = ({IDL}) => {
  const Branch = IDL.Rec();
  const List = IDL.Rec();
  const Error = IDL.Variant({
    'Named': IDL.Null,
    'NoBox': IDL.Null,
    'DataBoxNotExist': IDL.Null,
    'OnlyDataBoxCanDeleted': IDL.Null,
    'NameRepeat': IDL.Null,
    'UnAuthorized': IDL.Null,
    'DataBoxNotShareTo': IDL.Null,
    'SomethingErr': IDL.Null,
    'LedgerTransferError': IDL.Nat,
    'Invalid_Operation': IDL.Null,
    'NotBoxOwner': IDL.Null,
    'NotifyCreateError': IDL.Nat,
  });
  const Result_2 = IDL.Variant({'ok': IDL.Null, 'err': Error});
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
  const CreateBoxArgs = IDL.Record({
    'metadata': BoxMetadata,
    'install_args': IDL.Vec(IDL.Nat8),
  });
  const Result_5 = IDL.Variant({'ok': IDL.Principal, 'err': Error});
  const DelBoxArgs = IDL.Record({
    'cycleTo': IDL.Opt(IDL.Principal),
    'box_type': BoxType,
    'canisterId': IDL.Principal,
  });
  const Result_4 = IDL.Variant({'ok': IDL.Text, 'err': Error});
  const BoxStatus = IDL.Variant({'stopped': IDL.Null, 'running': IDL.Null});
  const BoxInfo__1 = IDL.Record({
    'status': BoxStatus,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const Hash = IDL.Nat32;
  const Key = IDL.Record({'key': BoxInfo__1, 'hash': Hash});
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Null), List)));
  const AssocList = IDL.Opt(IDL.Tuple(IDL.Tuple(Key, IDL.Null), List));
  const Leaf = IDL.Record({'size': IDL.Nat, 'keyvals': AssocList});
  const Trie = IDL.Variant({
    'branch': Branch,
    'leaf': Leaf,
    'empty': IDL.Null,
  });
  Branch.fill(IDL.Record({'left': Trie, 'size': IDL.Nat, 'right': Trie}));
  const Set = IDL.Variant({
    'branch': Branch,
    'leaf': Leaf,
    'empty': IDL.Null,
  });
  const TopUpArgs = IDL.Record({
    'box_id': IDL.Principal,
    'icp_amount': IDL.Nat64,
  });
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const BlockIndex__1 = IDL.Nat64;
  const Token = IDL.Record({'e8s': IDL.Nat64});
  const BlockIndex = IDL.Nat64;
  const TransferError = IDL.Variant({
    'TxTooOld': IDL.Record({'allowed_window_nanos': IDL.Nat64}),
    'BadFee': IDL.Record({'expected_fee': Token}),
    'TxDuplicate': IDL.Record({'duplicate_of': BlockIndex}),
    'TxCreatedInFuture': IDL.Null,
    'InsufficientFunds': IDL.Record({'balance': Token}),
  });
  const Result_1 = IDL.Variant({'ok': BlockIndex__1, 'err': TransferError});
  const UpdateWasmArgs = IDL.Record({
    'wasm': IDL.Vec(IDL.Nat8),
    'box_type': BoxType,
  });
  const Result_3 = IDL.Variant({'ok': IDL.Text, 'err': IDL.Text});
  const BoxInfo = IDL.Record({
    'status': BoxStatus,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const UpgradeBoxArgs = IDL.Record({
    'info': BoxInfo,
    'install_args': IDL.Vec(IDL.Nat8),
  });
  const Result = IDL.Variant({'ok': IDL.Nat64, 'err': Error});
  const MetaBox = IDL.Service({
    'acceptSharedBox': IDL.Func(
      [IDL.Principal, IDL.Principal],
      [Result_2],
      [],
    ),
    'addAdmin': IDL.Func([IDL.Principal], [IDL.Bool], []),
    'changeAdmin': IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Bool], []),
    'clearLog': IDL.Func([], [], []),
    'createDataBox': IDL.Func([CreateBoxArgs], [Result_5], []),
    'createProfile': IDL.Func([], [IDL.Principal], []),
    'createXid': IDL.Func([], [IDL.Principal], []),
    'deleteBox': IDL.Func([DelBoxArgs], [Result_4], []),
    'emitShareBox': IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
    'getAdmins': IDL.Func([], [IDL.Vec(IDL.Principal)], ['query']),
    'getBoxes': IDL.Func([IDL.Principal], [IDL.Vec(BoxInfo__1)], ['query']),
    'getLog': IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Nat, IDL.Text))], ['query']),
    'getNameFromPrincipal': IDL.Func(
      [IDL.Principal],
      [IDL.Opt(IDL.Text)],
      ['query'],
    ),
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
    'getShareBoxes': IDL.Func([], [IDL.Vec(BoxInfo__1)], ['query']),
    'getSharedBoxes': IDL.Func([], [IDL.Vec(BoxInfo__1)], ['query']),
    'getUserPreBox': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, Set))],
      ['query'],
    ),
    'getUserWithDraw': IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat))],
      ['query'],
    ),
    'getXid': IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'installCycleWasm': IDL.Func([IDL.Vec(IDL.Nat8)], [Result_2], []),
    'removeShareBox': IDL.Func([IDL.Principal, IDL.Principal], [Result_2], []),
    'removeSharedBox': IDL.Func(
      [IDL.Principal, IDL.Principal],
      [Result_2],
      [],
    ),
    'setName': IDL.Func([IDL.Text], [Result_2], []),
    'startBox': IDL.Func([BoxInfo__1], [], []),
    'stopBox': IDL.Func([BoxInfo__1], [], []),
    'topUpBox': IDL.Func([TopUpArgs], [Result_2], []),
    'transferOutICP': IDL.Func([AccountIdentifier, IDL.Nat64], [Result_1], []),
    'updateBoxInfo': IDL.Func([BoxInfo__1], [Result_2], []),
    'updateWasm': IDL.Func([UpdateWasmArgs], [Result_3], []),
    'updateWasmOnce': IDL.Func([IDL.Vec(IDL.Nat8)], [Result_3], []),
    'upgradeBox': IDL.Func([UpgradeBoxArgs], [Result_2], []),
    'upgradeBoxOnce': IDL.Func([UpgradeBoxArgs], [Result_2], []),
    'wallet_receive': IDL.Func([], [], []),
    'withdrawOutIcp': IDL.Func([AccountIdentifier], [Result_1], []),
    'xdrIcpRate': IDL.Func([], [Result], []),
  });
  return MetaBox;
};
export const init = ({IDL}) => {
  return [];
};
