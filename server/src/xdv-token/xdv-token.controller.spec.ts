import { Test, TestingModule } from "@nestjs/testing";
import { XdvTokenController } from "./xdv-token.controller";
import { XdvTokenService } from "./xdv-token.service";

describe.skip("AppController", () => {
  let controller: XdvTokenController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [XdvTokenController],
      providers: [XdvTokenService],
    }).compile();

    controller = app.get<XdvTokenController>(XdvTokenController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(controller.getOwner()).to.be("Hello World!");
    });
  });
});
