import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import "./Header.scss";
import { MoneyCollectTwoTone, CalculatorFilled , BellFilled} from "@ant-design/icons";
function HeaderContent() {
  return (
    <div className="nav-bar">
      <Container className="container">
        <Row>
          <Col md={6}>Avesome Shop</Col>
          <Col md={6}>
            <div className="content d-flex">
              <div className="give-task">
                <i className="fa-regular fa-square-plus"></i>
              </div>
              <div className="calculator">
              <CalculatorFilled />
              </div>
              <div className="today-profit">
                <MoneyCollectTwoTone />
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