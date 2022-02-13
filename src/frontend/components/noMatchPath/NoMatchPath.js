import { Result, Button, Col } from "antd";
import { Link } from "react-router-dom";

import "./NoMatch.scss";

const NoMatch = () => {
  return (
    <Col className="no-match-container">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
      />
    </Col>
  )
}

export default NoMatch;