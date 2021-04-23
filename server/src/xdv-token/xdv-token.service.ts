import { Inject, Injectable } from "@nestjs/common";
import { XDV_CONTRACT } from "./constants";
import { XdvContract } from "./types";

@Injectable()
export class XdvTokenService {
  constructor(
    @Inject(XDV_CONTRACT) private readonly xvdContract: XdvContract,
  ) {}

  async getOwner(): Promise<string> {
    return this.xvdContract.owner();
  }
}
