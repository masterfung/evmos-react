
import { 
  Button, 
  InputNumber, 
  Typography, 
  Col, 
  Card,
  notification,
} from "antd";
import {useState, useEffect } from "react";
import { ethers } from "ethers";
import { getBlockchain } from "../ethereum";
import detectEthereumProvider from "@metamask/detect-provider";
import { EVM_RPC_URL } from "../../utils/constants";
import { getLocalStorageAndStore } from "../../utils/utils";
import "./SimpleContract.scss";

const { Title, Text } =  Typography;

// SimpleContractComponent has no props taken in. This is a simple contract client component for the solidity contract. It sets integer values (uint in Solidity) and utilizes Metamask to interface with client to approve/reject changes. The data value was the last encountered value on the blockchain since deployment. The transaction logs (if any made) will be saved to LocalStorage
const SimpleContractComponent = () => {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  // const [processing, setProcessing] = useState(false);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect( () => {
    const init = async () => {
      let provider = await detectEthereumProvider();
      let accounts;
      if(provider) {
        accounts = await provider.request({ method: "eth_requestAccounts" });
        console.log('accounts', accounts);
        const networkId = await provider.request({ method: "net_version" });
        console.log("networkId", networkId, typeof networkId);
        if (networkId !== "9000") {
          setError(`Operation only works on chain-ID 9000 or EVMOS. You are currently ${networkId}. Please switch and refresh network.`);
          return;
        } 
      }
      const { simpleStorage } = await getBlockchain(provider);
      const data = await simpleStorage.readData();
      setAccount(accounts[0].toLowerCase());
      setSimpleStorage(simpleStorage);
      setData(data);
    };
    init();
  }, []);

  const updateData = async (e) => {
    const tx = await simpleStorage.updateData(Number(e.target.value));
    await tx.wait();
    const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
    const transactionDetail = await provider.getTransaction(tx.hash);
    getLocalStorageAndStore(account, transactionDetail)
    const newData = await simpleStorage.readData();
    setData(newData);
  };

  return (
    <Col sm={20} md={20} lg={24} xl={24} xxl={24} className="simple-contract-parent-container">
        
      { typeof simpleStorage === undefined || typeof data === undefined
      ? "Loading..."
      : null
      }
      { data && simpleStorage 
        ? (
          <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
            <div className="simple-storage-container">
              <Title>Interact with Ethereum Smart Contract</Title>
              <Text>A simple smart contract to save an integer.</Text>
              <Card title="Simple Contract" className="simple-contract-card">
                <h2>Data:</h2>
                <p>{data.toString()}</p>
                <h2>Change data (numbers only)</h2>
                <InputNumber 
                  type="text" 
                  className="integer-input" 
                  placeholder="data"
                  onPressEnter={updateData}
                />
              </Card>
            </div>
        </Col>
        ) : (
          <div>
            {error 
              ? (
                <>
                  <Title>{error}</Title>
                  <Button onClick={() => window.location.reload()}>Refresh Page</Button>
                </>
              ) 
              : null}
        </div>
        )
      }
    </Col>
  )
}

export default SimpleContractComponent;