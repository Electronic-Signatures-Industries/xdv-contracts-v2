import { Injectable } from "@nestjs/common";
import { default as Web3Type } from "web3";
const Web3 = require("web3"); // eslint-disable-line @typescript-eslint/no-var-requires

@Injectable()
export class Web3Provider {
  public readonly web3: Web3Type = new Web3("ws://127.0.0.1:8545");
}
