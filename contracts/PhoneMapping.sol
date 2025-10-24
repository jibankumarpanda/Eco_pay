// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PhoneMapping {
    mapping(bytes32 => address) public phoneToWallet;

    function registerPhone(bytes32 phoneHash) public {
        phoneToWallet[phoneHash] = msg.sender;
    }

    function getWallet(bytes32 phoneHash) public view returns (address) {
        return phoneToWallet[phoneHash];
    }
}
