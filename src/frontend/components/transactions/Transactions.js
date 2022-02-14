import { Col, Typography, List } from "antd";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Transactions.scss";

const { Title } = Typography;

// Transaction is a component that has no props but uses the URL and React Router to pull params to pull transactions from LocalStorage.
const Transactions = () => {
  const [data, setData] = useState(undefined);
  const params = useParams();

  useEffect(() => {
    const { address } = params;
    const transactions = JSON.parse(localStorage.getItem(address.toLowerCase()));
    setData(transactions);
  }, [params]);

  return (
    <Col sm={24} md={24} lg={24} xl={24} xxl={24} >
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