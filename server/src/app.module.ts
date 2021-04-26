import { Module } from "@nestjs/common";
import { XdvTokenModule } from "./xdv-token/xdv-token.module";

@Module({
  imports: [XdvTokenModule]
})
export class AppModule { }
