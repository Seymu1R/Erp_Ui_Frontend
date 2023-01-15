import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Header.scss";
import { MoneyCollectOutlined, CalculatorFilled , BellFilled,PlusCircleOutlined} from "@ant-design/icons";
function HeaderContent() {
  return (
    <div className="nav-bar">
      <Container className="container">
        <Row>
          <Col md={6}>Avesome Shop</Col>
          <Col md={6}>
            <div className="content d-flex">
              <div className="give-task">
                <PlusCircleOutlined />
              </div>
              <div className="calculator">
              <CalculatorFilled />
              </div>
              <div className="today-profit">
              <MoneyCollectOutlined />
              </div>
              <div className="datatime">01/09/2023</div>
              <div className="notification">
              <BellFilled />
              </div>
              <div className="user">
               Admin
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeaderContent;