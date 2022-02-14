import { 
  Col, 
  Button, 
  Card, 
  Input, 
  notification,
  Radio
 } from "antd";
import { useState } from "react";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsBroadcastTxSuccess, SigningStargateClient, StargateClient } from "@cosmjs/stargate";
import { stringToPath } from "@cosmjs/crypto";
import { ethers } from "ethers";
import { 
  TENDERMINT_RPC_URL, 
  EVM_RPC_URL, 
  recipientEvmos, 
  mnemonicOne, 
  privateKeyReference,
  evmosChainId
 } from "../../utils/constants";
import { getLocalStorageAndStore } from "../../utils/utils";
import "./Configuration.scss";

const ConfigurationPage = () => {
  const [ethAmount, setEthAmount] = useState(0);
  const [ethAddress, setEthAddress] = useState(undefined);
  const [keySelection, setKeySelection] = useState("1");
  
  const cosmosTriggerConnectAndSendTo = async (toAddress) => {
    
    // const walletOne = await DirectSecp256k1HdWallet.fromMnemonic(
    //   mnemonicOne,
    //   {
    //     hdPaths: stringToPath("m/44'/60'/0'/0/0"),
    //     prefix: "evmos"
    //   }
    // );
    // console.log('WalletOne', walletOne);

    // const [firstAccount] = await walletOne.getAccounts();
    // const client = await SigningStargateClient.connectWithSigner(TENDERMINT_RPC_URL, walletOne);
    // const result = await client.sendTokens(firstAccount.address, toAddress, [amount], "Have fun with your star coins");
    // console.log("HERE IS THE RES", result);
    // assertIsBroadcastTxSuccess(result);
  }

  const sendEthToAddress = async () => {
    const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
    const wallet = new ethers.Wallet(privateKeyReference[keySelection], provider);
    console.log('wallet --%%', wallet, wallet.address);
    const tx = {
      to: ethAddress,
      value: ethers.utils.parseEther(ethAmount)
    }
    const txData = await wallet.sendTransaction(tx);
    getLocalStorageAndStore(wallet.address, txData);
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
          <p>Transfer ETH from an address and to recipient</p>
          <p>Amount: <Input 
          placeholder="Enter Amount to Transfer"
          onChange={(e) => setEthAmount(e.target.value)} /></p>
          
          <p>
          From Account
          </p>
          <Radio.Group onChange={e => setKeySelection(e.target.value)} defaultValue="1">
            <Radio.Button value="1">Account 1</Radio.Button>
            <Radio.Button value="2">Account 2</Radio.Button>
            <Radio.Button value="3">Account 3</Radio.Button>
          </Radio.Group>

          <p>
          To:
          <Input 
          placeholder="Enter TO ETH Address"
          onChange={(e) => {
            let input = e.target.value;
            input = input.toLowerCase();
            if (ethers.utils.isAddress(input)) {
              setEthAddress(input);
              return
            }
            return notification.error({
              message: "Cannot use entered address",
              description: "Please verify and try again"
            })
          }
          } />
          </p>
          <Button type="primary" onClick={() => sendEthToAddress()}>Transfer Eth to Account</Button>
        </div>
      </Card>
    </Col>
  )
};

export default ConfigurationPage;