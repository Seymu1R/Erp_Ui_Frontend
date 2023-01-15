import React from 'react'
import { Col, Row, Input, Button } from "antd";

function AddBrand() {
  

  return (
    <form>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="name">BrandName</label>
          <Input
            type="text"
            id="name"
            size="large"
            placeholder="BrandName"
          />
        </Col>
        <Col span={8}>
       
        </Col>
      </Row>

      <Button type="primary">Add</Button>
    </form>
  )
}

export default AddBrand