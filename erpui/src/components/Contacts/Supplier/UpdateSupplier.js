import React, { useEffect, useContext, useState} from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import ErpContext from "../../store/erp-context";
import { supplierservices } from "../../APIs/Services/SupplierServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";

function UpdateSupplier() {
  const [{ id }] = useContext(ErpContext);
  const [form] = useForm();
  const [total, SetTotalpurchase] = useState(0)
  const navigate = useNavigate()
  const {supplierId} = useParams()

  useEffect(() => {
    supplierservices.getSupplier(supplierId).then(({ data: supplier }) => {
      SetTotalpurchase(supplier.data.totalPurchase)
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
  }, [supplierId,form]);

  const updateSupplier = (body) => {
    supplierservices
      .updateSupplier(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigate("/suppliers"));
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
          totalPurchase : `${total}`
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
                required : true,          
                message: "Please enter a valid Payterm"                
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
        Update
      </Button>
    </Form>
  );
}

export default UpdateSupplier;
