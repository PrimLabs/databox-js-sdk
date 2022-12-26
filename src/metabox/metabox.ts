import {idlFactory} from "./did/metabox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {
  BoxAllInfo,
  BoxInfo__1,
  BoxMetadata,
  CreateBoxArgs,
  DelBoxArgs, Result, Result_5,
  Result_6,
  TopUpArgs, UpgradeBoxArgs
} from "./did/metabox_type";
import {getToAccountIdentifier} from "../utils";

export const mb_cid = "zbzr7-xyaaa-aaaan-qadeq-cai"

export class MetaBox {
  private readonly metaBoxCai = mb_cid
  private readonly agent: HttpAgent
  private readonly MetaBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(agent: HttpAgent) {
    this.agent = agent
    this.MetaBoxActor = Actor.createActor(idlFactory, {agent, canisterId: this.metaBoxCai})
  }

  async get_accountID() {
    const principal = await this.agent.getPrincipal()
    return getToAccountIdentifier(Principal.from(this.metaBoxCai), principal)
  }

  async createBoxFree(
    arg: BoxMetadata
  ) {
    return new Promise<Principal>(async (resolve, reject) => {
      try {
        const Actor = this.MetaBoxActor;
        const Arg: CreateBoxArgs = {
          'metadata': arg
        }
        const res = await Actor.createDataBoxFree(Arg) as Result_6 as any
        if (Object.keys(res)[0] === "ok") return resolve(res.ok)
        else reject(`${Object.keys(res.err)[0]}`);
      } catch (e) {
        reject(e);
      }
    });
  }

  async createBoxFee(arg: BoxMetadata, is_need_refresh: boolean) {
    return new Promise<Principal>(async (resolve, reject) => {
      try {
        const Actor = this.MetaBoxActor;
        const Arg: CreateBoxArgs = {
          'metadata': arg
        }
        const res = await Actor.createDataBoxFee(Arg, is_need_refresh) as Result_6 as any
        if (Object.keys(res)[0] === "ok") return resolve(res.ok)
        else reject(`${Object.keys(res.err)[0]}`);
      } catch (e) {
        reject(e);
      }
    });
  }

  async getICP() {
    try {
      const Actor = this.MetaBoxActor;
      const res = await Actor.getIcp() as bigint
      return Number(res)
    } catch (e) {
      throw e
    }
  }

  public async getBoxes(principal: Principal): Promise<BoxAllInfo[]> {
    try {
      return await this.MetaBoxActor.getBoxes(principal) as BoxAllInfo[]
    } catch (e) {
      throw e
    }
  }

  public async deleteBox(delBoxArgs: DelBoxArgs): Promise<Result_5> {
    try {
      return await this.MetaBoxActor.deleteBox(delBoxArgs) as Result_5
    } catch (e) {
      throw e
    }
  }

  async transferDataboxOwner(canister_id: Principal, to: Principal): Promise<Result> {
    try {
      return await this.MetaBoxActor.transferDataboxOwner(canister_id, to) as Result
    } catch (e) {
      throw  e
    }
  }

  public async startBox(boxInfo: BoxInfo__1) {
    try {
      await this.MetaBoxActor.startBox(boxInfo)
    } catch (e) {
      throw e
    }
  }

  public async topUpBox(TopUpArgs: TopUpArgs): Promise<Result> {
    try {
      return await this.MetaBoxActor.topUpBox(TopUpArgs) as Result
    } catch (e) {
      throw e
    }
  }

  async upgradeBox(UpgradeBoxArgs: UpgradeBoxArgs): Promise<Result> {
    try {
      return await this.MetaBoxActor.upgradeBox(UpgradeBoxArgs) as Result
    } catch (e) {
      throw e
    }
  }

  async getDataBoxVersion(): Promise<bigint> {
    try {
      return await this.MetaBoxActor.getDataBoxVersion() as bigint
    } catch (e) {
      throw e
    }
  }

  async updateBoxInfo(BoxInfo__1: BoxInfo__1): Promise<Result> {
    try {
      return await this.MetaBoxActor.updateBoxInfo(BoxInfo__1) as Result
    } catch (e) {
      throw e
    }
  }

}
