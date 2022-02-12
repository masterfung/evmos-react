import { Col, Typography, List } from "antd";
import { BigNumber, Contract, ethers } from "ethers";
import { useState, useEffect } from "react";
import { getBlockchain } from "../ethereum";
import { useParams } from "react-router-dom";
import SimpleContractAddress from "../../contractsData/contract-address-simple-storage.json";
import { Link } from "react-router-dom";
import detectEthereumProvider from "@metamask/detect-provider";

import "./Transactions.scss";

const { Title, Text } = Typography;

const Transactions = () => {
  const [data, setData] = useState(undefined);
  const params = useParams();
  console.log(params);

  useEffect(() => {
    const { address } = params;
    const transactions = JSON.parse(localStorage.getItem(address.toLowerCase()));
    setData(transactions);
    console.log('!!! transactions', address, transactions)
  }, []);

  return (
    <Col sm={20} md={16} lg={16} xl={16} xxl={16} >
      <Title>Transactions</Title>
      <List
        bordered
        dataSource={data}
        renderItem={({hash, blockNumber, chainId, from, value}) => {
          return (
            <div className="transaction-container">
              <List.Item><b>Hash</b>: <Link to={`/transaction/${hash}`}>{hash}</Link></List.Item>
              <List.Item><b>Block Number</b>: {blockNumber}</List.Item>
              <List.Item><b>Chain ID</b>: {chainId}</List.Item>
              <List.Item><b>From</b>: {from}</List.Item>
            </div>
          )
        }}
      />
    </Col>
  )
}

export default Transactions;