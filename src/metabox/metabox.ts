import {idlFactory} from "./did/metabox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {Principal} from "@dfinity/principal";
import {IDL} from "@dfinity/candid";
import {BoxInfo__1, BoxMetadata, DelBoxArgs, Result_2, Result_5, TopUpArgs} from "./did/metabox_type";

export class MetaBox {
  private readonly metaBoxCai = "zbzr7-xyaaa-aaaan-qadeq-cai"
  private readonly agent: HttpAgent
  private readonly MetaBoxActor: ActorSubclass<Record<string, ActorMethod<unknown[], unknown>>>

  constructor(agent: HttpAgent) {
    this.agent = agent
    this.MetaBoxActor = Actor.createActor(idlFactory, {agent, canisterId: this.metaBoxCai})
  }

  private async getArg(principal: Principal): Promise<ArrayBuffer> {
    let createFunc: any;
    const service = idlFactory({IDL});
    for (const [methodName, func] of service._fields) {
      if (methodName === "getBoxes") {
        createFunc = {
          methodName: methodName,
          func: func,
        };
      }
    }
    //通过 getBoxes函数的argTypes encode user's Principal
    return IDL.encode(createFunc.func.argTypes, [principal]);
  }

  public async createDataBox(props: BoxMetadata): Promise<Result_5> {
    try {
      await this.MetaBoxActor.xdrIcpRate()
      const principal = await this.agent.getPrincipal()
      const install_args = await this.getArg(principal);
      return await this.MetaBoxActor.createDataBox({
        metadata: props,
        install_args: Array.from(new Uint8Array(install_args)),
      }) as Result_5;
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
