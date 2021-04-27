import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import EventEmitter from "events";
import { Callback } from "types/typechain/types";
import { DocumentAnchored, ServiceFeePaid, XDVToken } from "types/typechain/XDVToken";
import { XDV_CONTRACT } from "./constants";

@Injectable()
export class XdvTokenService implements OnModuleDestroy {
  private readonly logger = new Logger(XdvTokenService.name);
  private readonly subscriptions: EventEmitter[] = [];

  constructor(
    @Inject(XDV_CONTRACT) private readonly xvdContract: XDVToken
  ) {
    this.subscriptions.push(xvdContract.events.ServiceFeePaid({ fromBlock: 0 }, this.onServiceFeePaid));
    this.subscriptions.push(xvdContract.events.DocumentAnchored({ fromBlock: 0 }, this.onDocumentAnchored));
    this.logger.log("Event Subscriptions started");
  }

  onDocumentAnchored: Callback<DocumentAnchored> = async (_, event) => {
    this.logger.log(`Document Anchored: Id ${event.returnValues.id}.`);
  }

  onServiceFeePaid: Callback<ServiceFeePaid> = async (_, event) => {
    const { tokenId } = event.returnValues;
    this.logger.log(`ServiceFeePaidEvent: tokenId - ${tokenId}.`);
    const fileUri = await this.xvdContract.methods.fileUri(tokenId).call();
    this.logger.log(`File to Transfer: ${fileUri}`)
  }

  onModuleDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.removeAllListeners();
    }
    this.logger.log("Unsubscribed");
  }

  async getOwner(): Promise<string> {
    return this.xvdContract.methods.owner().call();
  }
}
