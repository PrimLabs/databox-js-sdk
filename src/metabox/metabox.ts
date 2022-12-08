import {idlFactory} from "./did/metabox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {
  BoxAllInfo,
  BoxInfo__1,
  BoxMetadata,
  CreateBoxArgs,
  DelBoxArgs, Result, Result_3,
  Result_6,
  TopUpArgs, UpgradeBoxArgs
} from "./did/metabox_type";
import {authApi} from "../auth";

export class MetaBox {
  private readonly metaBoxCai = "zbzr7-xyaaa-aaaan-qadeq-cai"
  private readonly agent: HttpAgent
  private readonly MetaBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(agent: HttpAgent) {
    this.agent = agent
    this.MetaBoxActor = Actor.createActor(idlFactory, {agent, canisterId: this.metaBoxCai})
  }


  public async createDataBox(props: BoxMetadata): Promise<Result_3> {
    try {
      const principal = await this.agent.getPrincipal()
      const arg: CreateBoxArgs = {
        metadata: props
      }
      const u8 = authApi.get_auth_token(principal)
      const res = await this.MetaBoxActor.createDataBox(arg, u8) as Result_3;
      if (Object.keys(res)[0] === "err") {
        //@ts-ignore
        throw new Error(`${Object.keys(res.err)[0]}`)
      } else return res
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

  public async deleteBox(delBoxArgs: DelBoxArgs): Promise<Result_6> {
    try {
      return await this.MetaBoxActor.deleteBox(delBoxArgs) as Result_6
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

  async upgradeBoxOnce(UpgradeBoxArgs: UpgradeBoxArgs): Promise<Result> {
    try {
      return await this.MetaBoxActor.upgradeBoxOnce(UpgradeBoxArgs) as Result
    } catch (e) {
      throw e
    }
  }

  async upgradeBoxTwice(UpgradeBoxArgs: UpgradeBoxArgs): Promise<Result> {
    try {
      return await this.MetaBoxActor.upgradeBoxTwice(UpgradeBoxArgs) as Result
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
