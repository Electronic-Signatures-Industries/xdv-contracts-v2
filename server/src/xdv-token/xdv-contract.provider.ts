import { FactoryProvider } from "@nestjs/common";
import { XDVToken } from "@xdvplatform/contracts";
import { XDV_CONTRACT, XDV_CONTRACT_ADDRESSES } from "./constants";
import { XdvContract } from "./types";
const Web3 = require("web3"); // eslint-disable-line @typescript-eslint/no-var-requires

export const XdvContractProvider: FactoryProvider<Promise<XdvContract>> = {
  provide: XDV_CONTRACT,

  useFactory: async () => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
    const web3 = new Web3(provider);
    return XDVToken(web3).at(XDV_CONTRACT_ADDRESSES.GANACHE);
  },
};
