import React from "react";
import "../AddUsers/AddUsers.scss";
import { Col, Row, Input } from "antd";
import Button from "react-bootstrap/Button";
import AssignRole from "../AssignRole/AssignRole";

function EditUser() {
  return (
    <form>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="username">UserName</label>
          <Input
            type="text"
            id="username"
            size="large"
            placeholder="UserName"
          />
        </Col>
        <Col span={8}>
          <label htmlFor="email">Email</label>
          <Input type="email" id="email" size="large" placeholder="Email" />
        </Col>
        <Col span={8}>
          <label htmlFor="phonenumber">PhoneNumber</label>
          <Input
            type="phone"
            id="phonenumber"
            size="large"
            placeholder="PhoneNumber"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" size="large" placeholder="Name" />
        </Col>
        <Col span={8}>
          <label htmlFor="surname">SurName</label>
          <Input type="text" id="surname" size="large" placeholder="Surname" />
        </Col>
        <Col span={8}>
          <label htmlFor="fathername">FatherName</label>
          <Input
            type="text"
            id="fathername"
            size="large"
            placeholder="FatherName"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="assignrole">Assign Role</label>
          <AssignRole />
        </Col>
      </Row>
      <Button variant="primary">Edit</Button>
    </form>
  );
}

export default EditUser;
