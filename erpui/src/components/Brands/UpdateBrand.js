import React from 'react'
import { Col, Row, Input, Button } from "antd";


function UpdateBrand() {
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

      <Button type="primary">Update</Button>
    </form>
  )
}

export default UpdateBrand