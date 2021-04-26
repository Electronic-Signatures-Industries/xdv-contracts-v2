import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { XDVTokenInstance } from "types/truffle-contracts";
import { XDV_CONTRACT } from "./constants";

@Injectable()
export class XdvTokenService implements OnModuleDestroy {
  private readonly logger = new Logger(XdvTokenService.name);

  constructor(
    @Inject(XDV_CONTRACT) private readonly xvdContract: XDVTokenInstance,
  ) {
    xvdContract.allEvents().addListener("ServiceFeePaid", (args) => {
      this.logger.log(args);
    });
    this.logger.log("Event Subscription started");
  }

  async getOwner(): Promise<string> {
    return this.xvdContract.owner();
  }

  onModuleDestroy() {
    this.xvdContract.allEvents().removeAllListeners();
    this.logger.log("All Listeners Removed");
  }
}
