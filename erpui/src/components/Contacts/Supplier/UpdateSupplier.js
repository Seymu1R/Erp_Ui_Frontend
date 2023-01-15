import React from 'react'
import { Col, Row, Input , Checkbox } from "antd";
import Button from "react-bootstrap/Button";

function UpdateSupplier() {
  return (
    <form>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label htmlFor="businessname">BusinessName</label>
        <Input
          type="text"
          id="businessname"
          size="large"
          placeholder="businessname"
        />
      </Col>
      <Col span={8}>
        <label htmlFor="name">Name</label>
        <Input type="name" id="name" size="large" placeholder="Name" />
      </Col>
      <Col span={8}>
        <label htmlFor="taxnumber">TaxNumber</label>
        <Input
          type="text"
          id="taxnumber"
          size="large"
          placeholder="TaxNumber"
        />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label htmlFor="address">Address</label>
        <Input type="text" id="address" size="large" placeholder="Address" />
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
      <Col span={8}>
        <label htmlFor="email">Email</label>
        <Input type="email" id="email" size="large" placeholder="Email" />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label htmlFor="payterm">PayTerm</label>
        <Input
          type="number"
          id="payterm"
          size="large"
          placeholder="PayTerm"
        />
      </Col>
      <Col span={5} style={{textAlign:"center"}}>
        <label style={{width:"100%"}} htmlFor="payterm">ActiveStatus</label>
        <Checkbox  style={{marginleft:"20px"}} size="large" />
      </Col>
    </Row>
    <Button variant="primary">Update</Button>
  </form>
  )
}

export default UpdateSupplier