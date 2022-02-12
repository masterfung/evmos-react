import { Col, Typography } from "antd";
import SearchBar from "../searchBar/SearchBar";

const { Title, Text } = Typography;

const HomePage = () => {
  return (
    <Col sm={24} md={16} lg={16} xl={16} xxl={16} >
      <Title>Search</Title>
      <SearchBar />
    </Col>
  )
}

export default HomePage;