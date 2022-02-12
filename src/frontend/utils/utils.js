export function copyToClipboard(input) {
  return navigator.clipboard.writeText(input);
} 

export function validate_txhash(addr) {
  return /^0x([A-Fa-f0-9]{64})$/.test(addr);
}