import { Module } from "@nestjs/common";
import { Web3Provider } from "./web3.provider";
import { XdvContractProvider } from "./xdv-contract.provider";
import { XdvTokenController } from "./xdv-token.controller";
import { XdvTokenService } from "./xdv-token.service";

@Module({
  providers: [XdvContractProvider, XdvTokenService, Web3Provider],
  controllers: [XdvTokenController],
  exports: [XdvTokenService],
})
export class XdvTokenModule { }
