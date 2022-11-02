import {idlFactory} from "./did/metabox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {IDL} from "@dfinity/candid";
import {
  BoxInfo__1,
  BoxMetadata,
  CreateBoxArgs,
  DelBoxArgs, Result_1,
  Result_2,
  Result_5,
  Result_6,
  TopUpArgs
} from "./did/metabox_type";

export class MetaBox {
  private readonly metaBoxCai = "zbzr7-xyaaa-aaaan-qadeq-cai"
  private readonly agent: HttpAgent
  private readonly MetaBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(agent: HttpAgent) {
    this.agent = agent
    this.MetaBoxActor = Actor.createActor(idlFactory, {agent, canisterId: this.metaBoxCai})
  }

  public async createDataBoxSingle(props: BoxMetadata): Promise<Result_6> {
    try {
      const arg: CreateBoxArgs = {
        metadata: props
      }
      return await this.MetaBoxActor.createDataBoxOne(arg) as Result_6;
    } catch (e) {
      throw e
    }
  }

  public async createDataBox(props: BoxMetadata): Promise<Result_6> {
    try {
      const arg: CreateBoxArgs = {
        metadata: props
      }
      const res = await this.MetaBoxActor.createDataBox(arg) as Result_6;
      if (Object.keys(res)[0] === "err") {
        //@ts-ignore
        if (Object.keys(res.err)[0] === "NoBox") {
          return await this.createDataBoxSingle(props)        //@ts-ignore
        } else throw new Error(`${Object.keys(res.err)[0]}`)
      } else return res
    } catch (e) {
      throw e
    }
  }

  public async getBoxes(principal: Principal): Promise<BoxInfo__1[]> {
    try {
      return await this.MetaBoxActor.getBoxes(principal) as BoxInfo__1[]
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

  public async startBox(boxInfo: BoxInfo__1) {
    try {
      await this.MetaBoxActor.startBox(boxInfo)
    } catch (e) {
      throw e
    }
  }

  public async topUpBox(boxInfo: BoxInfo__1) {
    try {
      await this.MetaBoxActor.topUpBox(boxInfo)
    } catch (e) {
      throw e
    }
  }

}
