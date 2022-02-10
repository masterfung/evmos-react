import { Menu, Typography } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useNavigate, Link } from "react-router-dom";
import "./HeaderContainer.scss";

const { Title } = Typography;

const HeaderContainer = () => {
  const navigate = useNavigate()
  return (
    <Header className="header-container">
      <Title className="home-link" onClick={() => navigate("/")}>Evmos React</Title>
      <Menu mode="horizontal" className="menu-system">
        <Menu.Item key="1">
          <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open("https://evmos.dev/");}}>
            Learn
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/interact">Interact</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="route" target="_blank" onClick={(event) => {event.preventDefault(); window.open("https://evmos.org/");}}>
            Learn
          </Link>
        </Menu.Item>
        </Menu>
    </Header>
  )
}

export default HeaderContainer;