const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  const balance = await deployer.getBalance();
  console.log(`Acount balance: ${balance.toString()}`);

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const storage = await SimpleStorage.deploy();
  console.log(`SimpleStorage address: ${storage.address}`);

  const contractsDir = __dirname + "/../../frontend/contractsData";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ SimpleStorage: storage.address }, undefined, 2)
  );

  const SimpleStorageArtifact = artifacts.readArtifactSync("SimpleStorage");

  fs.writeFileSync(
    contractsDir + "/SimpleStorage.json",
    JSON.stringify(SimpleStorageArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });