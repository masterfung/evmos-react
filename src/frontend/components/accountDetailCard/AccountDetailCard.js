
import { Card, Tooltip, Button } from "antd";
import { CopyTwoTone } from "@ant-design/icons/lib/icons";
import { useNavigate } from "react-router-dom";
import { copyToClipboard } from "../../utils/utils";

import "./AccountDetailCard.scss";

const keyConverter = {
  "ethAddress": "Ethereum Address",
  "evmosAddress": "Evmos Address",
  "ethBalance": "ETH Balance",
  "evmosBalance": "Evmos Balance"
}

const AccountDetailCard = ({result}) => {
  const navigate = useNavigate();
  return (
    result ? (
      <Card title="Account Details" className="card-container">
      {
        Object.entries(result).map((entry, index) => {
          return (<p key={index} className="card-entry">
          <b>{`${keyConverter[entry[0]]}`}</b>: <code>{`${entry[1]}`}</code> 
          { " " }
          <Tooltip title="Copy"><CopyTwoTone onClick={() => copyToClipboard(entry[1])} /></Tooltip>
          </p>
          )
        })
      }
      <Button type="primary" onClick={() => navigate(`/transactions/${result.ethAddress}`)}>View Transactions for Ethereum</Button>
      { "  " }
      <Button type="primary" onClick={() => navigate(`/transactions/${result.evmosAddress}`)}>View Transactions for Evmos</Button>

    </Card>
    ) : null
  )
}

export default AccountDetailCard;

