import React from 'react'
import { Col, Row, Input, Button, Form } from "antd";
import { brandservices } from '../APIs/Services/BrandsService';

function AddBrand() {
  
  const addBrand = (body) => {
    brandservices
      .createBrand(body)
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
        brandName: `${values.brandName}`,
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
              message: "Please enter your BrandName",
              whitespace: true,
              min: 3,
              max: 20,
            },
          ]}
          hasFeedback
          name="brandName"
          label="BrandName"
        >
          <Input
            type="text"
            id="brandName"
            size="large"
            placeholder="BrandName"
            style={{ width: "90%" }}
          />
        </Form.Item>
      </Col>
    </Row>

    <Button htmlType={"submit"} type="primary">
      Add
    </Button>
  </Form>    
  )
}

export default AddBrand