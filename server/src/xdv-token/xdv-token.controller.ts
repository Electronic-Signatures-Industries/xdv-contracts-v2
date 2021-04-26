import { Controller, Get } from "@nestjs/common"
import { XdvTokenService } from "./xdv-token.service";

@Controller()
export class XdvTokenController {
  constructor(private readonly tokenService: XdvTokenService) { }

  @Get()
  getOwner(): Promise<string> {
    return this.tokenService.getOwner();
  }
}