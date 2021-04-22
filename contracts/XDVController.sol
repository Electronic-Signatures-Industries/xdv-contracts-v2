// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

pragma experimental ABIEncoderV2;

import "./XDVToken.sol";
import "./MinterCore.sol";
import "./IERC1271.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract XDVController is MinterCore, IERC1271, Ownable {
    using EnumerableSet for EnumerableSet.AddressSet;
    using Address for address payable;
    XDVToken private platformToken;
    IERC20 public token;

    // minters
    mapping(address => DataProviderMinter) internal minters;
    mapping(address => uint256) public dataProviderAccounting;

    constructor(address stablecoin, address xdv) {
        token = IERC20(stablecoin);
        platformToken = XDVToken(xdv);
    }

    /**
     * @dev ERC-1271 Compatibility. This checks that the message signature was sent by the
     * contract's owner.
     * @return magicValue either 0x00000000 for false or 0x1626ba7e for true.
     * 0x1626ba7e == bytes4(keccak256("isValidSignature(bytes32,bytes)")
     */
    function isValidSignature(bytes32 hash, bytes memory signature)
        external
        view
        override
        returns (bytes4 magicValue)
    {
        // Inspiration 1: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/mocks/ERC1271WalletMock.sol
        // Inspiration 2: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/2424/files#diff-ff994ffdd277f7cdf0abeb3093d8d5eb7b072a80ebd89f3578cc38ecd1cb6cf2R24
        address signer = ECDSA.recover(hash, signature);
        return signer == owner() ? this.isValidSignature.selector : bytes4(0);
    }

    /**
     * User requests anchored document to be process
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
     *  @dev Mints a platform token.
     */
    function mint(
        uint256 requestId,
        address user,
        address dataProvider,
        string memory tokenURI
    ) public returns (uint256) {
        require(
            minterDocumentRequests[dataProvider][requestId].status ==
                uint256(DocumentMintingRequestStatus.REQUEST),
            "Document with invalid status"
        );
        require(user != address(0), "Invalid address");

        // updates a request
        minterDocumentRequests[dataProvider][requestId].status = uint256(
            DocumentMintingRequestStatus.MINTED
        );

        minterCounter[dataProvider] = minterCounter[dataProvider] + 1;
        return platformToken.mint(user, tokenURI);
    }

    /**
     * @dev Registers a data tokenization service
     *
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
