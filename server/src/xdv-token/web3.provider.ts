import { Injectable } from "@nestjs/common";
const Web3 = require("web3"); // eslint-disable-line @typescript-eslint/no-var-requires

@Injectable()
export class Web3Provider {
  private readonly web3: Web3 = new Web3("ws://127.0.0.1:8545");

  public getWeb3(): Web3 {
    return this.web3;
  }
}