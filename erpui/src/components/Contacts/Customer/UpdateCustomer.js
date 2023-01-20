import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { customerservice } from "../../APIs/Services/CustomerServices";
import ErpContext from "../../store/erp-context";

  function UpdateCustomer() {
  const [{ id }] = useContext(ErpContext);
  const [customeritem, setCustomer] = useState({});

  useEffect(()=>{
  customerservice.getCustomer(id).then(({data:customer})=>{
   setCustomer(customer.data)
  })
  },[id])

  const updateCustomer = (body) => {
    customerservice
      .updateCustomer(body)
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
        const Obj = {
          id: `${id}`,
          address: `${values.address}`,
          businessName: `${values.businessName}`,
          email: `${values.email}`,
          name: `${values.name}`,
          taxNumber: `${values.taxNumber}`,
          phoneNumber: `${values.phoneNumber}`,
        };
        updateCustomer(Obj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            defaultValue={customeritem.businessName}
            rules={[
              {
                required: true,
                message: "Please enter your BusinessName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="businessName"
            label="BusinessName"
          >
            <Input
              type="text"
              id="businessName"
              size="large"
              placeholder="BusinessName"
              style={{ width: "90%" }}
              defaultValue={customeritem.businessName}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter  Name",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="name"
            label="Name"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="name"
              size="large"
              placeholder="Name"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter  Taxnumber",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="taxNumber"
            label="TaxNumber"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="taxNumber"
              size="large"
              placeholder="TaxNumber"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter Address",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="address"
            label="Address"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="address"
              size="large"
              placeholder="Address"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter PhoneNumber",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="phoneNumber"
            label="PhoneNumber"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="phoneNumber"
              size="large"
              placeholder="PhoneNumber"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter a valid Email",
                whitespace: true,
                type: "email",
              },
            ]}
            hasFeedback
            name="email"
            label="Email"
          >
            <Input
              style={{ width: "90%" }}
              type="email"
              id="email"
              size="large"
              placeholder="Email"
            />
          </Form.Item>
        </Col>
      </Row>
      <Button htmlType={"submit"} type="primary">
        Edit
      </Button>
    </Form>)
  
}

export default UpdateCustomer;
