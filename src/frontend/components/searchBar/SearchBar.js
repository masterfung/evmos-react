import { Input, Select, Button, Col, Card } from "antd";
import { useState } from "react";
import { ethers } from "ethers";
import {ethToEvmos, evmosToEth} from "@hanchon/ethermint-address-converter";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import AccountDetailCard from "../accountDetailCard/AccountDetailCard";
import "./SearchBar.scss";

const { Option } = Select;

const keyConverter = {
  "ethAddress": "Ethereum Address",
  "evmosAddress": "Evmos Address",
  "ethBalance": "ETH Balance",
  "evmosBalance": "Evmos Balance"
}

const SearchBar = () => {
  const [select, setSelect] = useState("Ethereum");
  const [input, setInput] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const handleSearch = () => {
    if (input.length === 0) return;
    const data = {};
    const initiate = async () => {
      if(select === "Ethereum") {
        const provider = new ethers.providers.JsonRpcProvider();
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
    <Col span={20} offset={2}>
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