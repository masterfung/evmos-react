import { Input, Select, Button, Col, notification } from "antd";
import { useState } from "react";
import { ethers } from "ethers";
import {ethToEvmos} from "@hanchon/ethermint-address-converter";
import AccountDetailCard from "../accountDetailCard/AccountDetailCard";
import "./SearchBar.scss";
import { EVM_RPC_URL } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { getTokenContractReferenceAndReturnBalance, isValidEthereumDataString, validate_txhash } from "../../utils/utils";

const { Option } = Select;

// SearchBar is a component that allows users to search for entities around transactions(tx) through hashes or addresses for Ethereum and Evmos. Results are displayed with the AccountDetailCard component
const SearchBar = () => {
  const [select, setSelect] = useState("Ethereum");
  const [input, setInput] = useState(undefined);
  const [result, setResult] = useState(undefined);
  const navigate = useNavigate();

  // HandleSearch is a function with async/await structure built in. checks over the input and handles tx and addresses accordingly for each perspective blockchain. error handling is also ensured. No results are returned, just saved to state
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
        if (!isValidEthereumDataString(input)) {
          return;
        }
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
        const signer = provider.getSigner();
        const erc20 = await getTokenContractReferenceAndReturnBalance(input, signer);
        const etherBalance = await provider.getBalance(input);
        let address = ethToEvmos(input);
        data["evmosAddress"] = address;
        data["ethAddress"] = input;
        data["ethBalance"] = `${ethers.utils.formatEther(etherBalance)} ETH`;
        data["erc20"] = Object.keys(erc20).length ? erc20 : undefined
      } else if (select === "Evmos") {
        console.log("Evmos logic goes here");
      }
      console.log(data);
      setResult(previousState => ({...previousState, ...data}));
    }

    initiate();
  }

  return(
    <Col sm={24} md={24} lg={24} xl={24} xxl={24} className="search-bar-container">
      <Input.Group compact className="search-bar">
        <Select defaultValue="Ethereum" onSelect={(e, f) => setSelect(e)}>
          <Option value="Ethereum">Ethereum</Option>
          <Option value="Evmos">Evmos</Option>
        </Select>
        <Input
          onChange={e => setInput(e.target.value.toLowerCase())}
          placeholder="Paste address/tx hash"
        />
        <Button type="primary" onClick={() => handleSearch()}>Search</Button>
      </Input.Group>
      <AccountDetailCard result={result} />
    </Col>
  )
}

export default SearchBar;