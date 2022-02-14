import { Layout, Row } from "antd";
import { Outlet } from "react-router-dom";

import HeaderContainer from "./headerContainer/HeaderContainer";
import "./App.scss";

const { Content, Footer } = Layout;

// App takes no props and structures the application scaffolding with the a simple responsive layout. Outlet is from React Router to handle content embedding and flows.
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
