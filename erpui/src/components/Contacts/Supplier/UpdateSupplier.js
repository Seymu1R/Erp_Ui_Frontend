import React, { useEffect, useContext} from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import ErpContext from "../../store/erp-context";
import { supplierservices } from "../../APIs/Services/SupplierServices";
import { useForm } from "antd/es/form/Form";

function UpdateSupplier() {
  const [{ id }] = useContext(ErpContext);
  const [form] = useForm();

  useEffect(() => {
    supplierservices.getSupplier(id).then(({ data: supplier }) => {
      form.setFieldsValue({
        address: supplier.data.address,
        businessName: supplier.data.businessName,
        email: supplier.data.email,
        taxNumber: supplier.data.taxNumber,
        name: supplier.data.name,
        phoneNumber: supplier.data.phoneNumber,
        payTerm: supplier.data.payTerm,
      });
    });
  }, [id,form]);

  const updateSupplier = (body) => {
    supplierservices
      .updateSupplier(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      });
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          id: `${id}`,
          address: `${values.address}`,
          businessName: `${values.businessName}`,
          email: `${values.email}`,
          name: `${values.name}`,
          taxNumber: `${values.taxNumber}`,
          phoneNumber: `${values.phoneNumber}`,
          payTerm: `${values.payTerm}`,
        };
        updateSupplier(postObj);
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
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter a valid Email",
                whitespace: true,
                min: 0,
              },
            ]}
            hasFeedback
            name="payTerm"
            label="PayTerm"
          >
            <Input
              style={{ width: "90%" }}
              type="number"
              id="payTerm"
              size="large"
              placeholder="PayTerm"
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

export default UpdateSupplier;
