import { Inject, Injectable } from "@nestjs/common";
import { XDVTokenInstance } from "types/truffle-contracts";
import { XDV_CONTRACT } from "./constants";

@Injectable()
export class XdvTokenService {
  constructor(
    @Inject(XDV_CONTRACT) private readonly xvdContract: XDVTokenInstance,
  ) { }

  async getOwner(): Promise<string> {
    return this.xvdContract.owner();
  }
}
