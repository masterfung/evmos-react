import { Col, Typography } from "antd";
import SearchBar from "../searchBar/SearchBar";

const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <Col span={20} offset={2}>
      <SearchBar />
    </Col>
  )
}

export default HomePage;