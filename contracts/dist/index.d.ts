// updated at: 2021-05-14T19:31:31.523Z

export declare enum ContractNames {
  XDVToken = 'XDVToken',
}

export declare function getContractAddress(contractName: ContractNames, networkId?: string | number): string;

export declare function getContractAbiDefinition(contractName: ContractNames): any;

export declare function getContractByteCodeHash(contractName: ContractNames): string;
