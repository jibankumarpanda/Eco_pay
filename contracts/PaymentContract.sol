// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PaymentContract {
    address public ecoFund; // eco donation wallet

    constructor(address _ecoFund) {
        ecoFund = _ecoFund;
    }

    function sendPayment(address receiver) external payable {
        require(msg.value > 0, "Must send some value");
        uint256 donation = msg.value / 100; // 1% donation
        uint256 amountToSend = msg.value - donation;

        payable(receiver).transfer(amountToSend);
        payable(ecoFund).transfer(donation);
    }
}
