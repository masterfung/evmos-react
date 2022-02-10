import { Input, Select, Button } from "antd";

const { Option } = Select;

const SearchBar = () => {
  return(
    <Input.Group compact>
        <Select defaultValue="Sign Up" style={{ width: '30%' }}>
          <Option value="Sign Up">Sign Up</Option>
          <Option value="Sign In">Sign In</Option>
        </Select>
        <Input
          style={{ width: '70%' }}
          placeholder="Email"
          options={[{ value: 'text 1' }, { value: 'text 2' }]}
        />
        <Button type="primary">Search</Button>
      </Input.Group>
  )
}

export default SearchBar;