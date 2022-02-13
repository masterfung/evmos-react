import { Input, Select, Button, Col, notification } from "antd";
import { useState } from "react";
import { ethers } from "ethers";
import {ethToEvmos, evmosToEth} from "@hanchon/ethermint-address-converter";
import AccountDetailCard from "../accountDetailCard/AccountDetailCard";
import "./SearchBar.scss";
import { EVM_RPC_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { validate_txhash } from "../../utils/utils";

const { Option } = Select;

const SearchBar = () => {
  const [select, setSelect] = useState("Ethereum");
  const [input, setInput] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.length === 0) return;
    if (input.includes("evmos") && select === "Ethereum") {
      notification.warning({
        message: "Incorrect Blockchain",
        description: "Please update chain to Evmos"
      });
      return;
    } else if (input.includes("0x") && select === "Evmos") {
      notification.warning({
        message: "Incorrect Blockchain",
        description: "Please update chain to Ethereum"
      });
      return;
    }
    const data = {};
    const initiate = async () => {
      if(select === "Ethereum") {
        const provider = new ethers.providers.JsonRpcProvider(EVM_RPC_URL);
        if (!ethers.utils.isAddress(input) && validate_txhash(input)) {
          try {
            const txData = await provider.getTransactionReceipt(input);
            if (txData.blockNumber) {
              navigate(`transaction/${input}`);
            }
  
          } catch (e) {
            console.log('Error with tx hash inputted', e);
          }
        }
        const balance = await provider.getBalance(input);
        let address = ethToEvmos(input);
        console.log('converted addy', address);
        data["evmosAddress"] = address;
        data["ethAddress"] = input;
        data["ethBalance"] = `${ethers.utils.formatEther(balance)} ETH`;
      } else if (select === "Evmos") {
        console.log("Hi!");
      }
      console.log(data);
      setResult(previousState => ({...previousState, ...data}));
    }

    initiate();
  }

  console.log('res', result);

  return(
    <Col sm={24} md={20} lg={20} xl={20} xxl={20} className="search-bar-container">
      <Input.Group compact className="search-bar">
        <Select defaultValue="Ethereum" onSelect={(e, f) => setSelect(e)}>
          <Option value="Ethereum">Ethereum</Option>
          <Option value="Evmos">Evmos</Option>
        </Select>
        <Input
          onChange={e => setInput(e.target.value)}
          placeholder="Paste address/tx hash"
        />
        <Button type="primary" onClick={() => handleSearch()}>Search</Button>
      </Input.Group>
      <AccountDetailCard result={result} />
    </Col>
  )
}

export default SearchBar;