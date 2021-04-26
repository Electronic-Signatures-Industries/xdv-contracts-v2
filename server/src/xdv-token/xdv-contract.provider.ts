import { FactoryProvider } from "@nestjs/common";
import { XDVTokenArtifact } from "@xdvplatform/contracts";
import { XDVToken } from "types/typechain/XDVToken";
import { XDV_CONTRACT } from "./constants";
import { Web3Provider } from "./web3.provider";

export const XdvContractProvider: FactoryProvider<Promise<XDVToken>> = {
  provide: XDV_CONTRACT,

  inject: [Web3Provider],

  useFactory: async (web3Provider: Web3Provider): Promise<any> => {
    const web3 = web3Provider.getWeb3();
    const address = XDVTokenArtifact.networks["10"].address;
    return new web3.eth.Contract(XDVTokenArtifact.abi, address);
  },
};
