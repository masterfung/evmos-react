import { ethers } from "ethers";
import { notification } from "antd";

export function copyToClipboard(input) {
  return navigator.clipboard.writeText(input);
} 

export function validate_txhash(addr) {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
}

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