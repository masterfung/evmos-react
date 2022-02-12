import { Col, Typography } from "antd";
import { Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { getBlockchain } from "../ethereum";
import SimpleContractAddress from "../../contractsData/contract-address-simple-storage.json";
import detectEthereumProvider from "@metamask/detect-provider";

const { Title, Text } = Typography;


const Transactions = () => {
  const {data, setData} = useState(undefined);

  useEffect(() => {
    const init = async () => {
      let provider = await detectEthereumProvider();
      if(provider) {
        await provider.request({ method: "eth_requestAccounts" });

        const { simpleStorage } = await getBlockchain(provider);
        // const eventFilter = simpleStorage.filters.SimpleStorageUpdated();
        // const events = await simpleStorage.queryFilter(eventFilter);
        // console.log(events);

        simpleStorage.on("SimpleStorageUpdated", (data, address) => {
          console.log(address, data);
        })

        // console.log(logs);
      }
    }

    init();
  }, []);

  return (
    <Col span={20} offset={2}>
      <Title>Transactions</Title>
    
    </Col>
  )
}

export default Transactions;