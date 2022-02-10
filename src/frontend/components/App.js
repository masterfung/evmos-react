import { Layout, Row, Typography } from "antd";
import { Outlet } from "react-router-dom";

import HeaderContainer from "./headerContainer/HeaderContainer";
import "./App.scss";

const { Content, Footer } = Layout;
const { Title } = Typography;

const App = () => {

  return (
    <Layout className="App">
      <HeaderContainer />
      <Content className="app-content">
        <Row>
          <Outlet />
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} Tsung Hung
      </Footer>
    </Layout>
  );
}

export default App;
