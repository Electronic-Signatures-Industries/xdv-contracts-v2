import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import EventEmitter from "events";
import { XDVToken } from "types/typechain/XDVToken";
import { XDV_CONTRACT } from "./constants";

@Injectable()
export class XdvTokenService implements OnModuleDestroy {
  private readonly logger = new Logger(XdvTokenService.name);
  private readonly subscription: EventEmitter;

  constructor(
    @Inject(XDV_CONTRACT) private readonly xvdContract: XDVToken
  ) {
    this.subscription = xvdContract.events.ServiceFeePaid({ fromBlock: 0 }, async (_, event) => {
      const { tokenId } = event.returnValues;
      this.logger.log(`ServiceFeePaidEvent: tokenId - ${tokenId}`);
      const fileUri = await xvdContract.methods.fileUri(tokenId).call();
      this.logger.log(`File to Transfer: ${fileUri}`)
    });

    this.logger.log("Event Subscription started");
  }

  onModuleDestroy() {
    this.subscription.removeAllListeners();
    this.logger.log("Unsubscribed");
  }

  async getOwner(): Promise<string> {
    return this.xvdContract.methods.owner().call();
  }
}
