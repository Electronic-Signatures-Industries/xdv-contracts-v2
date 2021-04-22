// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 *  @dev MinterCore
 */
abstract contract MinterCore {
    // Documents provider mappings
    mapping(address => uint256) public minterCounter;

    // Requested Documents by minter id sequence/autonumber
    mapping(address => uint256) public minterDocumentRequestCounter;

    // Requests by minter by autonumber
    mapping(address => mapping(uint256 => DocumentMintingRequest))
        public minterDocumentRequests;

    enum DocumentMintingRequestStatus {REQUEST, MINTED, BURNED}

    // Document minting request
    struct DocumentMintingRequest {
        address user;
        string userDid;
        address toMinter; // NFT
        string toMinterDid;
        string documentURI;
        uint256 status;
        uint256 timestamp;
        string description;
    }

    // Document minting provider
    struct DataProviderMinter {
        string name;
        address paymentAddress;
        bool hasUserKyc;
        uint256 feeStructure;
        uint256 created;
        address factoryAddress;
        bool enabled;
    }

    // RequestMinting events
    event MinterRegistered(
        address indexed minter, // NFT
        string name
    );

    // DocumentAnchored events
    event DocumentAnchored(
        address indexed user,
        string indexed userDid,
        string documentURI,
        uint256 id
    );
}
