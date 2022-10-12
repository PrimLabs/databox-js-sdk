export const idlFactory = ({IDL}) => {
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
    'icp_amount': IDL.Nat64,
  });
  const Error = IDL.Variant({
    'Named': IDL.Null,
    'NoBox': IDL.Null,
    'OnlyDataBoxCanDeleted': IDL.Null,
    'NameRepeat': IDL.Null,
    'UnAuthorized': IDL.Null,
    'SomethingErr': IDL.Null,
    'LedgerTransferError': IDL.Nat,
    'Invalid_Operation': IDL.Null,
    'NotifyCreateError': IDL.Nat,
  });
  const Result_3 = IDL.Variant({'ok': IDL.Principal, 'err': Error});
  const DelBoxArgs = IDL.Record({
    'cycleTo': IDL.Opt(IDL.Principal),
    'box_type': BoxType,
    'canisterId': IDL.Principal,
  });
  const Result_2 = IDL.Variant({'ok': IDL.Text, 'err': Error});
  const BoxStatus = IDL.Variant({'stopped': IDL.Null, 'running': IDL.Null});
  const BoxInfo__1 = IDL.Record({
    'status': BoxStatus,
    'canister_id': IDL.Principal,
    'is_private': IDL.Bool,
    'box_name': IDL.Text,
    'box_type': BoxType,
  });
  const Result = IDL.Variant({'ok': IDL.Null, 'err': Error});
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
  const UpgradeBoxArgs = IDL.Record({
    'info': BoxInfo,
    'install_args': IDL.Vec(IDL.Nat8),
  });
  const MetaBox = IDL.Service({
    'changeAdmin': IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Bool], []),
    'clearLog': IDL.Func([], [], []),
    'createBox': IDL.Func([CreateBoxArgs], [Result_3], []),
    'createXid': IDL.Func([], [IDL.Principal], []),
    'deleteBox': IDL.Func([DelBoxArgs], [Result_2], []),
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
    'getXid': IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'installCycleWasm': IDL.Func([IDL.Vec(IDL.Nat8)], [Result], []),
    'mintBox': IDL.Func([IDL.Principal, IDL.Vec(IDL.Nat8)], [IDL.Text], []),
    'setName': IDL.Func([IDL.Text], [Result], []),
    'startBox': IDL.Func([BoxInfo__1], [], []),
    'stopBox': IDL.Func([BoxInfo__1], [], []),
    'topUpBox': IDL.Func([TopUpArgs], [Result], []),
    'updateBoxInfo': IDL.Func([BoxInfo__1], [Result], []),
    'update_wasm': IDL.Func([UpdateWasmArgs], [Result_1], []),
    'upgradeBox': IDL.Func([UpgradeBoxArgs], [Result], []),
    'wallet_receive': IDL.Func([], [], []),
  });
  return MetaBox;
};
export const init = ({IDL}) => {
  return [];
};
