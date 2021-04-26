import { Inject, Injectable, Logger, OnModuleDestroy } from "@nestjs/common";
import { XDVTokenInstance } from "types/truffle-contracts";
import { XDV_CONTRACT } from "./constants";
import { Web3Provider } from "./web3.provider";

@Injectable()
export class XdvTokenService implements OnModuleDestroy {
  private readonly logger = new Logger(XdvTokenService.name);
  private readonly subscription;

  constructor(
    @Inject(Web3Provider) private readonly web3Provider: Web3Provider,
    @Inject(XDV_CONTRACT) private readonly xvdContract: XDVTokenInstance
  ) {
    // TODO: This listener does not work with Truffle. Using Web3JS instead.
    const web3 = this.web3Provider.getWeb3();
    const web3Contract = new web3.eth.Contract(xvdContract.abi, xvdContract.address);
    this.subscription = web3Contract.events.ServiceFeePaid({ fromBlock: 0 }, async (_, event) => {
      const { tokenId } = event.returnValues;
      this.logger.log(`ServiceFeePaidEvent: tokenId - ${tokenId}`);
      const fileUri = await xvdContract.fileUri(tokenId)
      this.logger.log(`File to Transfer: ${fileUri}`)
    });

    this.logger.log("Event Subscription started");
  }

  onModuleDestroy() {
    this.subscription.unsubscribe();
    this.logger.log("Unsubscribed");
  }

  async getOwner(): Promise<string> {
    return this.xvdContract.owner();
  }
}
