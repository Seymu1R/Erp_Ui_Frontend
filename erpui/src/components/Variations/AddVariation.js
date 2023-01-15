import React from "react";
import { Col, Row, Input, Button, Select } from "antd";

function AddVariation() {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  return (
    <form>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="name">VariationName</label>
          <Input
            type="text"
            id="name"
            size="large"
            placeholder="VariationName"
          />
        </Col>
        <Col span={8}>
          <label >Variations</label>
          <Select
            mode="tags"
            style={{
              width: "100%",
            }}
            tokenSeparators={[","]}
            options={options}
          />
        </Col>
      </Row>

      <Button type="primary">Add</Button>
    </form>
  );
}

export default AddVariation;
