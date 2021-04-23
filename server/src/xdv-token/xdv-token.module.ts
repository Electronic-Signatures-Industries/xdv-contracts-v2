import { Module } from "@nestjs/common";
import { XdvContractProvider } from "./xdv-contract.provider";
import { XdvTokenService } from "./xdv-token.service";

@Module({
  providers: [XdvContractProvider, XdvTokenService],
  exports: [XdvTokenService],
})
export class XdvTokenModule {}
