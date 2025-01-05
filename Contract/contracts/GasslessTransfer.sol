// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

import "./IERC20Permit.sol";

contract GaslessTransfer {
    IERC20Permit public immutable token;
    address public immutable owner;

    constructor(address tokenAddress) {
        token = IERC20Permit(tokenAddress);
        owner = msg.sender;
    }

    error GaslessTransfer__NotEnoughAllowance();
    error GaslessTransfer__NotEnoughBalance();
    error GaslessTransfer__TransferFailed();
    error GaslessTransfer__PermitFailed();

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function transfer(
        address _owner,
        uint256 _value,
        uint256 _deadline,
        uint8 _v,
        bytes32 _r,
        bytes32 _s,
        address _to,
        uint256 _charge
    ) external onlyOwner {
        uint256 _totalValue = _value + _charge;

        try
            token.permit(
                _owner,
                address(this),
                _totalValue,
                _deadline,
                _v,
                _r,
                _s
            )
        {} catch {
            revert GaslessTransfer__PermitFailed();
        }

        bool success1 = token.transferFrom(_owner, address(this), _totalValue);
        if (!success1) {
            revert GaslessTransfer__TransferFailed();
        }

        bool success2 = token.transfer(_to, _value);
        if (!success2) {
            revert GaslessTransfer__TransferFailed();
        }

        bool success3 = token.transfer(owner, _charge);
        if (!success3) {
            revert GaslessTransfer__TransferFailed();
        }
    }
}
