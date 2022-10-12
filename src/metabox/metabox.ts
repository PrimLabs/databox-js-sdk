import {idlFactory} from "./did/metabox"
import {Actor, ActorMethod, ActorSubclass, HttpAgent} from "@dfinity/agent";
import {createBoxArg} from "../types";
import {Principal} from "@dfinity/principal";
import {IDL} from "@dfinity/candid";
import {Result_3} from "./did/metabox_type";

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

  public async createBox(props: createBoxArg): Promise<Result_3> {
    try {
      const principal = await this.agent.getPrincipal()
      const install_args = await this.getArg(principal);
      return await this.MetaBoxActor.createBox({
        metadata: props.BoxMetadata,
        icp_amount: BigInt(props.icp_amount * 1e8),
        install_args: Array.from(new Uint8Array(install_args)),
      }) as Result_3;
    } catch (e) {
      throw e
    }
  }
}
