import { ethers, Contract } from 'ethers';
import SimpleStorage from '../contractsData/SimpleStorage.json';
import SimpleStorageTokenAddress from '../contractsData/contract-address-simple-storage.json';


// helper function to obtain all the necessary information 
// such as metamask initiation, contract, and returns to user
export const getBlockchain = (provider) =>
  new Promise( async (resolve, reject) => {
    if(provider) {
      const providerEthers = new ethers.providers.Web3Provider(provider);
      const signer = providerEthers.getSigner();
      const simpleStorage = new Contract(
        SimpleStorageTokenAddress.SimpleStorage,
        SimpleStorage.abi,
        signer
      );
      resolve({simpleStorage});
      return;
    }
    reject('Please Install and Link Metamask');
  });

