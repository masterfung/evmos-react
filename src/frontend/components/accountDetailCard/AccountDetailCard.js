
import { Card, Tooltip, Button, Tag } from "antd";
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

// AccountDetailCard takes in the results from SearchBar and iterates over the data object to display back what the user has in his or her account. 
const AccountDetailCard = ({result}) => {
  const navigate = useNavigate();
  return (
    result ? (
      <Card title="Account Details" className="card-container">
      {
        Object.entries(result).map((entry, index) => {
          console.log(entry);
          if (entry[0] === "erc20" && entry[1] !== undefined && Number(entry[1].balance) > 0) {
            return (
              <p key={index}><b>Token</b>: <code>{`${entry[1].balance} ${entry[1].token} [${entry[1].symbol}]`} <Tag color="cyan">ERC20 Token</Tag></code></p>
            )
          } else if (entry[1]?.balance !== "0") {
            return (<p key={index} className="card-entry">
            <b>{`${keyConverter[entry[0]]}`}</b>: <code>{`${entry[1]}`}</code> 
            { " " }
            <Tooltip title="Copy"><CopyTwoTone onClick={() => copyToClipboard(entry[1])} /></Tooltip>
            </p>
            )
          }
        })
      }
      <div className="button-container">
        <Button type="primary" onClick={() => navigate(`/transactions/${result.ethAddress}`)}>View Transactions for Ethereum</Button>
        { "  " }
        <Button type="primary" disabled onClick={() => navigate(`/transactions/${result.evmosAddress}`)}>View Transactions for Evmos</Button>
      </div>

    </Card>
    ) : null
  )
}

export default AccountDetailCard;

