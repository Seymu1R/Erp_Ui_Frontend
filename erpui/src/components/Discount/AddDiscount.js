import React from "react";
import { Col, Row, Input, DatePicker, Space, Select } from "antd";
import Button from "react-bootstrap/Button";

function AddDiscount() {
  const onChange = (value, dateString) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };
  const onOk = (value) => {
    console.log("onOk: ", value);
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <form>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            id="name"
            size="large"
            placeholder="AdditionalNote"
          />
        </Col>
        <Col span={8}>
          <label style={{ width: "100%" }}>StartTime</label>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChange} onOk={onOk} />
          </Space>
        </Col>
        <Col span={8}>
          <label style={{ width: "100%" }}>EndTime</label>
          <Space direction="vertical" size={12}>
            <DatePicker showTime onChange={onChange} onOk={onOk} />
          </Space>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="discountpercent">DiscountPercent</label>
          <Input
            type="number"
            id="discountpercent"
            size="large"
            placeholder="DiscountPercent"
          />
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
          <label style={{ width: "100%" }}>Products</label>
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            onChange={handleChange}
            options={options}
          />
        </Col>
      </Row>
      <Button variant="primary">Add</Button>
    </form>
  );
}

export default AddDiscount;
