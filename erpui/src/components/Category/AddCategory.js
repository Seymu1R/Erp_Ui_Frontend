import React from "react";
import { Col, Row, Input, Button, Checkbox, Select } from "antd";

function AddCategory() {
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
          <label htmlFor="name">CategoryName</label>
          <Input
            type="text"
            id="name"
            size="large"
            placeholder="CategoryName"
          />
        </Col>
        <Col span={8}>
          <label style={{ width: "100%", marginLeft: "20px" }}>Is Main?</label>
          <Checkbox style={{ marginLeft: "20px" }} />
        </Col>
        <Col span={8}>
          <label style={{ width: "100%", marginLeft: "20px" }}>
            ParentCategory
          </label>
          <Select
            disabled
            defaultValue="lucy"
            style={{
              width: "100%",
              marginLeft: "20px",
            }}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "disabled",
                disabled: true,
                label: "Disabled",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
            ]}
          />
        </Col>
      </Row>

      <Button type="primary">Add</Button>
    </form>
  );
}

export default AddCategory;
