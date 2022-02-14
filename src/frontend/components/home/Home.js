import { Col, Typography } from "antd";
import SearchBar from "../searchBar/SearchBar";

import "./Home.scss";

const { Title, Text } = Typography;

// HomePage takes no props and handles the origin index page for the website. SearchBar is a child component that renders within the Outlet in App.
const HomePage = () => {
  return (
    <Col sm={24} md={20} lg={20} xl={20} xxl={20} className="home-page-container">
      <Title>Search</Title>
      <Text>Search by inputting a valid address for Ethereum or Evmos to get</Text>
      <SearchBar />
    </Col>
  )
}

export default HomePage;