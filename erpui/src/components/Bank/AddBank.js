import { Button, Col, Form, Input, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { bankservices } from "../APIs/Services/BankServices";

function AddBank() {
  const navigation = useNavigate();
  const addBrand = (body) => {
    bankservices
      .createBank(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      })
      .finally(navigation("/banks"));
  };
  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          bankName: `${values.bankName}`,
          bankBalance: values.bankBalance,
        };
        addBrand(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your BankName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="bankName"
            label="BankName"
          >
            <Input
              type="text"
              id="bankName"
              size="large"
              placeholder="BrandName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="bankBalance"
            label="BankBalance"
          >
            <Input
              type="number"
              id="bankBalance"
              size="large"
              placeholder="BankBalance"
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

export default AddBank;
