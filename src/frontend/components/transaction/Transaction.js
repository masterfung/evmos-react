import { Col, Typography, Card} from "antd";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";

import "./Transaction.scss";
import { EVM_RPC_URL } from "../../utils/constants";
import { isValidEthereumDataString } from "../../utils/utils";

const { Title } = Typography;

// Keys we want no formatting done upon.
const stableKeys = ["blockHash", "v", "r", "s", "input", "hash"];

// Transaction has no props and handles the transaction display whenever a tx hash has been detected from the URL. The URL params is handled by React Router to display the result and saved to a state variable in React. The 
const Transaction = () => {
  const [transaction, setTransaction] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    const init = async () => {
      let { transactionHash } = params;
      transactionHash = transactionHash.toLowerCase();
      if (!isValidEthereumDataString(transactionHash)) {
        return;
      }
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
    <Col sm={20} md={20} lg={20} xl={20} xxl={20}  className="transaction-detail-container">
      <Title>Transaction</Title>
      <Card title="Transaction Detail" className="card-container">
        {
          (transaction && Object.keys(transaction).map((key, index) => {
          if (!ethers.utils.isAddress(transaction[key]) && !stableKeys.includes(key)) {
            return <p key={index}><b>{key}</b>: {Number(transaction[key])}</p>
          }
            return (
              <p key={index}><b>{key}</b>: {transaction[key]}</p>
            )
          })) || "Incorrect hash has been detected. Please validate and try again."
        }
      </Card>
    </Col>
  )
}

export default Transaction;