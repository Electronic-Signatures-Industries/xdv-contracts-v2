import { FactoryProvider } from "@nestjs/common";
import { XDVToken } from "@xdvplatform/contracts";
import { XDVTokenInstance } from "types/truffle-contracts";
import { XDV_CONTRACT, XDV_CONTRACT_ADDRESSES } from "./constants";
import { Web3Provider } from "./web3.provider";

export const XdvContractProvider: FactoryProvider<Promise<XDVTokenInstance>> = {
  provide: XDV_CONTRACT,

  inject: [Web3Provider],

  useFactory: async (web3Provider: Web3Provider): Promise<XDVTokenInstance> => {
    const web3 = web3Provider.getWeb3();
    return XDVToken(web3).at(XDV_CONTRACT_ADDRESSES.GANACHE);
  },
};
