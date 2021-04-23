// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol";

contract MockCoin is ERC20PresetMinterPauser {
    constructor() ERC20PresetMinterPauser("Mock", "Mock") {
        mint(address(this), 1000000 ether);
    }
}
