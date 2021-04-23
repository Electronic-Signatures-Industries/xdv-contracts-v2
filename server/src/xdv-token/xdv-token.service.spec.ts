import { Test, TestingModule } from "@nestjs/testing";
import { XdvTokenService } from "./xdv-token.service";

describe.skip("XdvTokenService", () => {
  let service: XdvTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XdvTokenService],
    }).compile();

    service = module.get<XdvTokenService>(XdvTokenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
