import { Module } from "@nestjs/common";
import { XdvContractProvider } from "./xdv-contract.provider";
import { XdvTokenController } from "./xdv-token.controller";
import { XdvTokenService } from "./xdv-token.service";

@Module({
  providers: [XdvContractProvider, XdvTokenService],
  controllers: [XdvTokenController],
  exports: [XdvTokenService],
})
export class XdvTokenModule { }
