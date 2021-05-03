// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC1271.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title 
/// @author IFESA - Roberto Zubieta
/// @notice
/// @dev

abstract contract XDVController is IERC1271, Ownable {
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

    // Documents provider mappings
    mapping(address => uint256) public minterCounter;

    // Requested Documents by minter id sequence/autonumber
    mapping(address => uint256) public minterDocumentRequestCounter;

    // Requests by minter by autonumber
    mapping(address => mapping(uint256 => DocumentMintingRequest))
        public minterDocumentRequests;

    // minters
    mapping(address => DataProviderMinter) internal minters;

    /**
     * @dev ERC-1271 Compatibility. This checks that the message signature was sent by the
     * contract's owner.
     * Inspired by this implementation: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/mocks/ERC1271WalletMock.sol
     * @return magicValue either 0x00000000 for false or 0x1626ba7e for true.
     * 0x1626ba7e == bytes4(keccak256("isValidSignature(bytes32,bytes)")
     */
    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        override
        returns (bytes4 magicValue)
    {
        address signer = ECDSA.recover(hash, signature);
        return signer == owner() ? this.isValidSignature.selector : bytes4(0);
    }

    /**
     * @dev User requests anchored document to be processed.
     */
    function requestDataProviderService(
        string memory minterDid,
        address minterAddress,
        string memory userDid,
        string memory documentURI,
        string memory description
    ) public returns (uint256) {
        uint256 i = minterDocumentRequestCounter[minterAddress];

        // Assign request to minter
        // We should move to use XDV Worker Protocol
        minterDocumentRequests[minterAddress][i] = DocumentMintingRequest({
            user: msg.sender,
            userDid: userDid,
            documentURI: documentURI,
            status: uint256(DocumentMintingRequestStatus.REQUEST),
            description: description,
            toMinterDid: minterDid,
            toMinter: minterAddress,
            timestamp: block.timestamp
        });
        minterDocumentRequestCounter[minterAddress]++;

        emit DocumentAnchored(msg.sender, userDid, documentURI, i);
        return i;
    }

    /**
     * @dev Registers a data tokenization service
     */
    function registerMinter(
        string memory name,
        address paymentAddress,
        bool userHasKyc,
        uint256 feeStructure
    ) public returns (uint256) {
        minterCounter[msg.sender]++;

        minters[msg.sender] = DataProviderMinter({
            name: name,
            paymentAddress: paymentAddress,
            hasUserKyc: userHasKyc,
            feeStructure: feeStructure,
            created: block.timestamp,
            factoryAddress: address(this),
            enabled: true
        });

        // set new minter
        emit MinterRegistered(msg.sender, name);
        return minterCounter[msg.sender];
    }
}
