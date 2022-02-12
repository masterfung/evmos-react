
import { Button, InputNumber, Typography, Col, Card} from "antd";
import {useState, useEffect } from "react";
import { ethers } from "ethers";
import { getBlockchain } from "../ethereum";
import detectEthereumProvider from "@metamask/detect-provider";

import "./SimpleContract.scss";

const { Title, Text } =  Typography;

const SimpleContractComponent = () => {
  const [simpleStorage, setSimpleStorage] = useState(undefined);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect( () => {
    const init = async () => {
      let provider = await detectEthereumProvider();
      if(provider) {
        await provider.request({ method: "eth_requestAccounts" });
        const networkId = await provider.request({ method: "net_version" });
        console.log("networkId", networkId, typeof networkId);
        if (networkId !== "9000") {
          setError(`Operation only works on chain-ID 9000 or EVMOS. You are currently ${networkId}. Please switch and refresh network.`);
          return;
        } 
      }
      const { simpleStorage } = await getBlockchain(provider);
      const data = await simpleStorage.readData();
      setSimpleStorage(simpleStorage);
      setData(data);
    };
    init();
  }, []);

  const updateData = async ({input}) => {
    const tx = await simpleStorage.updateData(input);
    await tx.wait();
    console.log("TX", tx);
    const provider = new ethers.providers.JsonRpcProvider();
    const resss = await provider.getTransaction(tx.hash);
    console.log("!!!", resss);
    const newData = await simpleStorage.readData();
    setData(newData);
  };

  return (
    <Col span={20} offset={2}>
        
        { typeof simpleStorage === undefined || typeof data === undefined
        ? "Loading..."
        : null
        }
      { data && simpleStorage 
        ? (
          <Col span={16}>
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
        ) : <div>
        {error 
          ? (
            <>
              <Title>{error}</Title>
              <Button onClick={() => window.location.reload()}>Refresh Page</Button>
            </>
          ) : null}
        </div>
      }
    </Col>
  )
}

export default SimpleContractComponent;