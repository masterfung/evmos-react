//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Token {
  string public name = "Serendipity";
  string public symbol = "SER";
  uint public totalSupply = 100000;
  address public owner;
  mapping(address => uint) balances;

  constructor () {
    balances[msg.sender] = totalSupply;
    owner = msg.sender;
  }

  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Cannot send more tokens than what you have");
    balances[msg.sender] -= amount;
    balances[to] += amount;
  }

  function balanceOf(address account) external view returns(uint) {
    return balances[account];
  }
}