import { Col, Button, Card } from "antd";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { stringToPath } from "@cosmjs/crypto";
import { ethers } from "ethers";
import { TENDERMINT_RPC_URL, EVM_RPC_URL } from "../../utils/constants";
import { Cosmos } from "@cosmostation/cosmosjs";
import message from "@cosmostation/cosmosjs/src/messages/proto";

import "./Configuration.scss";

const CHAIN_ID = "evmos_9000-1";

const mnemonicOne = "fade work muscle hope apology tent soda leader unlock bulk grant fluid still abandon deal parade basket illegal tattoo panic tilt talent seed farm";
const privateETHKeyOne = "0x4C42AA401F6D3832EA34757A7D0A30C4CDF74357F9807930AF0CDF24729FB1A4";

const recipientEvmos = "evmos1v9l5wggn8kushpnv2rczx75ywnp6hvw8aac6kn";
const ETHAddress = "0x617F4721133db90b866c50f0237a8474C3abB1c7";


const amount = {
  denom: "aevmos",
  amount: "1234567",
};

const ConfigurationPage = () => {
  const cosmosTriggerConnectAndSendTo = async (toAddress) => {
    const evmos = new Cosmos(TENDERMINT_RPC_URL, CHAIN_ID);
    evmos.setBech32MainPrefix("evmos");
    evmos.setPath("m/44'/60'/0'/0/0");
    const address = evmos.getAddress(mnemonicOne);
    console.log('addy', address);
    
    // const walletOne = await DirectSecp256k1HdWallet.fromMnemonic(
    //   mnemonicOne,
    //   {
    //     hdPaths: stringToPath("m/44'/60'/0'/0/0"),
    //     prefix: "evmos"
    //   }
    // );
    // console.log('WalletOne', walletOne);

    // const accounts = await walletOne.getAccounts();
    // const client = await SigningStargateClient.connectWithSigner(TENDERMINT_RPC_URL, walletOne);
    // const result = await client.sendTokens(firstAccount.address, toAddress, [amount], "Have fun with your star coins");
    // console.log("HERE IS THE RES", result);
    // assertIsBroadcastTxSuccess(result);
  }

  const sendEthToAddress = async (to) => {
    const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
    const wallet = new ethers.Wallet(privateETHKeyOne, provider);
    console.log('wallet --%%', wallet, wallet.address);
    const amountEther = "1.11";
    const tx = {
      to: to,
      value: ethers.utils.parseEther(amountEther)
    }
    const mainWallet = wallet.address.toLowerCase();
    const existingTransactions = JSON.parse(localStorage.getItem(mainWallet)) || [];
    const txData = await wallet.sendTransaction(tx);
    console.log(txData);
    
    existingTransactions.push(txData);
    console.log('existing trans after push', existingTransactions);
    localStorage.setItem(mainWallet, JSON.stringify(existingTransactions));
  }

  return (
    <Col sm={24} md={20} className="configuration-page-container">
      <Card title="Cosmos Section" className="cosmos">
        <div className="container">
          <p>Send Token from Main To</p>
          <Button type="primary" onClick={() => cosmosTriggerConnectAndSendTo(recipientEvmos)}>Trigger Send</Button>
        </div>
        <div className="container">
          <p>Send IBC Token To</p>
          <Button type="primary" onClick={() => cosmosTriggerConnectAndSendTo(recipientEvmos)}>Trigger IBC Send</Button>
        </div>
      </Card>

      <Card title="Ethereum Section" className="ethereum">
        <div className="container">
          <p>Transfer ETH from Main to Recipient</p>
          <Button type="primary" onClick={() => sendEthToAddress(ETHAddress)}>Transfer Eth to Account</Button>
        </div>
      </Card>
    </Col>
  )
};

export default ConfigurationPage;