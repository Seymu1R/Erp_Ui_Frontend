import React from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";

function AddStock() {
  const addStock = (body) => {
    stockservices
      .createStock(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      });
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          buisnessLocation: `${values.buisnessLocation}`,
        };
        addStock(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your BusinessLocation",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="buisnessLocation"
            label="BusinessLocation"
          >
            <Input
              type="text"
              id="buisnessLocation"
              size="large"
              placeholder="BusinessLocation"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
    </Form>
  );
}
export default AddStock;
