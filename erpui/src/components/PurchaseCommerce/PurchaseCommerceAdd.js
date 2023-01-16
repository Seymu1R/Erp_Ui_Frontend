import React from "react";
import { Col, Row, Input, Button, Select } from "antd";
import { Link } from "react-router-dom";

function PurchaseCommerceAdd() {
  return (
    <form>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="productamount">ProductAmount</label>
          <Input
            type="number"
            id="productamount"
            size="large"
            placeholder="ProductAmount"
          />
        </Col>
        <Col span={8}>
          <label style={{ width: "100%" }} htmlFor="shortname">
            Product
          </label>
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={[
              {
                value: "1",
                label: "Not Identified",
              },
              {
                value: "2",
                label: "Closed",
              },
              {
                value: "3",
                label: "Communicated",
              },
              {
                value: "4",
                label: "Identified",
              },
              {
                value: "5",
                label: "Resolved",
              },
              {
                value: "6",
                label: "Cancelled",
              },
            ]}
          />
        </Col>
      </Row>
      <Link to="/addpurchase">
        <Button type="primary">Add</Button>
      </Link>
    </form>
  );
}

export default PurchaseCommerceAdd;
