import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { XdvTokenModule } from "./xdv-token/xdv-token.module";

@Module({
  imports: [XdvTokenModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
