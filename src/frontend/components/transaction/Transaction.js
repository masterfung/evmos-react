import { Col, Typography, Card } from "antd";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

import "./Transaction.scss";
import { EVM_RPC_URL } from "../../utils/constants";

const { Title } = Typography;

// Keys we want no formatting done upon.
const stableKeys = ["blockHash", "v", "r", "s", "input", "hash"];

const Transaction = () => {
  const [transaction, setTransaction] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    const init = async () => {
      let { transactionHash } = params;
      transactionHash = transactionHash.toLowerCase();
      console.log('transaction hash', transactionHash);
      let provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
      const txInfo = await provider.send("eth_getTransactionByHash", [
        transactionHash,
      ]);
      setTransaction(txInfo);
      console.log('tx', txInfo);
    }

    init();
  }, [params]);

  return (
    <Col sm={20} md={16} lg={16} xl={16} xxl={16}  className="transaction-detail-container">
      <Title>Transaction</Title>
      <Card title="Transaction Detail" className="card-container">
        {transaction && Object.keys(transaction).map((key, index) => {
          if (!ethers.utils.isAddress(transaction[key]) && !stableKeys.includes(key)) {
            return <p key={index}><b>{key}</b>: {Number(transaction[key])}</p>
         }
          return (
            <p key={index}><b>{key}</b>: {transaction[key]}</p>
          )
        })}
      </Card>
    </Col>
  )
}

export default Transaction;