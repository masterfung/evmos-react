import { ethers, Contract } from "ethers";
import { notification } from "antd";
import TokenStorageLocation from "../contractsData/contract-address-token.json";
import Token from "../contractsData/Token.json";

// Copies selection to user clipboard. Returns nothing
export function copyToClipboard(input) {
  return navigator.clipboard.writeText(input);
} 

// Validates with regex on addr is a valid length and structure but does not guarantee the address is truly valid blokchain tx hash. Returns bool
export function validate_txhash(addr) {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
}

// Validates whether user data string is valid address Eth or tx encoding. Returns bool
export function isValidEthereumDataString(str) {
  if (!ethers.utils.isAddress(str) && !validate_txhash(str)) {
    notification.error({
      message: "Not a valid input",
      description: "Please enter a valid tx or address"
    })
    return false;
  }
  return true;
}

//  Utility function that takes in an address and tx data and saves it to the localStorage. If key exists, it appends but if it does not, it creates a new array. Returns nothing
export function getLocalStorageAndStore(address, txData) {
  const mainWallet = address.toLowerCase();
  if (txData.hash === null) return;
  const existingTransactions = JSON.parse(localStorage.getItem(mainWallet)) || [];
    console.log(txData);
    
  existingTransactions.push(txData);
  console.log('existing trans after push', existingTransactions);
  localStorage.setItem(mainWallet, JSON.stringify(existingTransactions));
}
/**
TODO: Whenever there are more contracts deployed, this function can evolved to take in extra params (token abi, and token deployed address) so it is more flexible. Since it is being used once, the concept is baked as is. Easy to transpose when the time comes. This simplication of logic applies to the transferToken function as well.

**/
// getTokenContractReferenceAndReturnBalance takes in address and provider--signer input to return back an object signifying if the user holds any ERC-20 tokens from stated Contract. . 
export async function getTokenContractReferenceAndReturnBalance(address, signer) {
  const contract = new Contract(
    TokenStorageLocation.Token,
    Token.abi,
    signer
  );

  const balance = await contract.balanceOf(address);
  const tokenName = await contract.name();
  const symbol = await contract.symbol();
  return {
    balance: balance.toString(),
    token: tokenName,
    symbol
  };
}

// helper function thats takes in toAddress, amount, and signer to transfer token to a defined location
export async function transferToken(to, amount, signer) {
  const contract = new Contract(
    TokenStorageLocation.Token,
    Token.abi,
    signer
  );
  const signerAddress = await signer.getAddress();
  const tx = await contract.transfer(to, amount);
  getLocalStorageAndStore(signerAddress, tx);
  return tx
}