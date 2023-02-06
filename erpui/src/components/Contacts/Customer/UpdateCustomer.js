import React, { useEffect, useState } from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { customerservice } from "../../APIs/Services/CustomerServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import ErorModal from "../../UI/ErorModal";

function UpdateCustomer() {
  const [total, setTotalSell] = useState(0);
  const [form] = useForm();
  const navigate = useNavigate();
  const {customerId} =  useParams()
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  useEffect(() => {
    customerservice.getCustomer(customerId).then(({ data: customer }) => {
      setTotalSell(customer.data.totalSale);
      form.setFieldsValue({
        address: customer.data.address,
        businessName: customer.data.businessName,
        email: customer.data.email,
        taxNumber: customer.data.taxNumber,
        phoneNumber: customer.data.phoneNumber        
      });
    });
  }, [customerId, total, form]);

  const updateCustomer = (body) => {
    customerservice
      .updateCustomer(body)    
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/customers");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErrorname("Oops, something went wrong");
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <>
     {modalHandler && (
        <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
      )}
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: customerId,
          address: `${values.address}`,
          businessName: `${values.businessName}`,
          email: `${values.email}`,          
          taxNumber: `${values.taxNumber}`,
          phoneNumber: `${values.phoneNumber}`,
          totalSale: total,
        };
        updateCustomer(Obj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
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
      </Row>
      <Row style={{ marginBottom: "20px" }}>
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
    </Form>
    </>    
  );
}

export default UpdateCustomer;
