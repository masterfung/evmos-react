//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract SimpleStorage {
  uint public data;

  event SimpleStorageUpdated(uint data, address indexed from);

  function updateData(uint _data) external {
    data = _data;
    emit SimpleStorageUpdated(_data, msg.sender);
  }

  function readData() external view returns(uint) {
    return data;
  }
}