// updated at: 2021-04-30T17:57:54.290Z

export declare enum ContractNames {
  XDVToken = 'XDVToken',
}

export declare function getContractAddress(contractName: ContractNames, networkId?: string | number): string;

export declare function getContractAbiDefinition(contractName: ContractNames): any;

export declare function getContractByteCodeHash(contractName: ContractNames): string;
