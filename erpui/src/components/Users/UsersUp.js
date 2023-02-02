import React from "react";
import { Col, Row, Input, Tooltip } from "antd";
import "./UsersUp.scss";
import { UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const UsersUp = () => (
  <Row style={{ marginBottom: "20px" }}>
    <Col span={18} push={6}></Col>
    <Col span={6} pull={18}>
      <Tooltip title="Add User" color={"#2b80ec"}>
        <Link to="/adduser">
          <UserAddOutlined
            style={{
              fontSize: "30px",
              color: "#2b80ec",
            }}
          />
        </Link>
      </Tooltip>
    </Col>
  </Row>
);
export default UsersUp;
