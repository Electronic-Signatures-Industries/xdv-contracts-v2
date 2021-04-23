import { Injectable } from "@nestjs/common";
import { XdvTokenService } from "./xdv-token/xdv-token.service";

@Injectable()
export class AppService {
  constructor(private readonly xdvTokenService: XdvTokenService) {}

  getHello(): Promise<string> {
    return this.xdvTokenService.getOwner();
  }
}
