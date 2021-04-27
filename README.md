# XDV Token V2

[![Continuous Integration](https://github.com/Electronic-Signatures-Industries/xdv-contracts-v2/actions/workflows/main.yml/badge.svg)](https://github.com/Electronic-Signatures-Industries/xdv-contracts-v2/actions/workflows/main.yml)

## Abstract

This monorepo holds the XDV Platform, Version 2. It uses the Ethereum Blockchain to register, sign and transfer documents via descentralized networks. The signatures used for these documents make them legally binding, thanks to the use of the same cryptographic functions as the "Firma Digital" and "Firma Calificada" in the Republic of Panama. The use case are Notaries: they receive a document, sign the document with their "Firma Digital" and transfer them back to the client, who then pays a prearranged fee to receive the document.

## Flowchart

![Flowchart](/flowchart.png)

## Running the Platform Demo

We have a small demo that shows the entire flow of the platform, from anchoring a document to receiving the fee.

1. `npm install`. This is an NPM Monorepo, so please run this command in the apex (`\`) folder, and make sure you have at least NPMv7. This will also run `typechain` on the `postinstall` script, which generates the Typescript typings for the server in the `server/types/typechain` folder.

1. `npm run ganache`. Run Ganache's development Ethereum network, and let it running.

1. `npm run truffle migrate --workspace=contracts`. Compile and Upload the contracts to the development Ethereum Network.

1. `npm run start --workspace=server`. Run the server, and let it running.

1. `npm run demo`. This will execute the demo script.

When running the Demo Script, notice how the logs from the Truffle Contracts match with the logs the server emits. The demo script starts doing a transaction flow, and when the blockchain confirms those transactions they are received by the server, who emits a confirmation. You can run the demo several times in a row to receive more events in the server.
