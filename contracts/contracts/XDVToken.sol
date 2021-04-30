// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./XDVController.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title 
/// @author IFESA - Roberto Zubieta
/// @notice
/// @dev

contract XDVToken is
    XDVController,
    ERC721Burnable,
    ERC721Pausable,
    ERC721Enumerable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    IERC20 public stablecoin;
    uint256 public serviceFeeForPaymentAddress = 0;
    uint256 public serviceFeeForContract = 0;
    address public paymentAddress;
    mapping(uint256 => string) public fileUri;

    event Withdrawn(address indexed paymentAddress, uint256 amount);

    event ServiceFeePaid(
        uint256 indexed tokenId,
        address indexed from,
        address indexed paymentAddress,
        uint256 paidToContract,
        uint256 paidToPaymentAddress
    );

    /**
     * XDV Data Token
     */
    constructor(address tokenERC20, address newPaymentAddress)
        ERC721("XDV Platform 2 Token", "XDV")
    {
        paymentAddress = newPaymentAddress;
        stablecoin = IERC20(tokenERC20);
    }

    function setServiceFeeForPaymentAddress(uint256 _fee) public onlyOwner {
        serviceFeeForPaymentAddress = _fee;
    }

    function setServiceFeeForContract(uint256 _fee) public onlyOwner {
        serviceFeeForContract = _fee;
    }

    function setPaymentAddress(address newAddress) public onlyOwner {
        paymentAddress = newAddress;
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Mints a XDV Data Token if whitelisted
     * @return tokenId
     */
    function mint(
        uint256 requestId,
        address user,
        address dataProvider,
        string memory uri
    ) public returns (uint256 tokenId) {
        require(
            minterDocumentRequests[dataProvider][requestId].status ==
                uint256(DocumentMintingRequestStatus.REQUEST),
            "XDV: Document with invalid status"
        );
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(user, newItemId);
        fileUri[newItemId] = uri;

        // updates a request
        minterDocumentRequests[dataProvider][requestId].status = uint256(
            DocumentMintingRequestStatus.MINTED
        );

        minterCounter[dataProvider] = minterCounter[dataProvider]++;

        return newItemId;
    }

    /**
     * @dev Prevents the contract from working until `unpause()` is called.
     * Used for Emergencies.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev If the contract is `paused()`, this will allow it to work again.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Custom hook implementation.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override(ERC721, ERC721Pausable, ERC721Enumerable) {
        // Token about to be burned.
        if (to == address(0)) {
            _paymentBeforeBurn(from, tokenId);
        }

        super._beforeTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev tries to execute the payment when the token is burned.
     * Reverts if the payment procedure could not be completed.
     */
    function _paymentBeforeBurn(address tokenHolder, uint256 tokenId)
        internal
        virtual
    {
        require(
            paymentAddress != address(0),
            "XDV: Must have a payment address"
        );

        // Transfer tokens to pay service fee
        require(
            stablecoin.transferFrom(
                tokenHolder,
                address(this),
                serviceFeeForContract
            ),
            "XDV: Transfer failed for recipient"
        );
        require(
            stablecoin.transferFrom(
                tokenHolder,
                paymentAddress,
                serviceFeeForPaymentAddress
            ),
            "XDV: Transfer failed for recipient"
        );

        emit ServiceFeePaid(
            tokenId,
            tokenHolder,
            paymentAddress,
            serviceFeeForContract,
            serviceFeeForPaymentAddress
        );
    }

    function withdrawBalance(address payable payee) public onlyOwner {
        uint256 balance = stablecoin.balanceOf(address(this));

        require(stablecoin.transfer(payee, balance), "XDV: Transfer failed");

        emit Withdrawn(payee, balance);
    }
}
