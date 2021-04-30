import type { AbiItem } from "web3-utils";
import { FactoryProvider, Logger } from "@nestjs/common";
import {
  ContractNames,
  getContractAddress,
  getContractAbiDefinition,
} from "@xdvplatform/contracts";
import { XDVToken } from "types/typechain/XDVToken";
import { XDV_CONTRACT } from "./constants";
import { Web3Provider } from "./web3.provider";

const logger = new Logger("XDVToken ContractProvider");

export const XdvContractProvider: FactoryProvider<Promise<XDVToken>> = {
  provide: XDV_CONTRACT,

  inject: [Web3Provider],

  useFactory: async (web3Provider: Web3Provider): Promise<any> => {
    const { web3 } = web3Provider;
    const networkId = await web3.eth.net.getId();
    const address = getContractAddress(ContractNames.XDVToken, networkId);
    const abi: AbiItem[] = getContractAbiDefinition(ContractNames.XDVToken);
    logger.log(`Contract Address: ${address}`);
    return new web3.eth.Contract(abi, address);
  },
};
