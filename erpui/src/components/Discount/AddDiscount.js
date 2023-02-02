import React, { useState, useEffect } from "react";
import { Col, Row, Input, DatePicker, Form, Select } from "antd";
import Button from "react-bootstrap/Button";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { productservices } from "../APIs/Services/ProductServices";
import { useNavigate } from "react-router-dom";

function AddDiscount() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProducts(products.data);
    });
  }, []);

  const optionsProduct = products.map((product) => {
    return <Select.Option key={product.id} value={product.id}>{product.name}</Select.Option>;
  });

  const addDiscount = (body) => {
    discountservices
      .createDiscount(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigate('/discounts'));
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          name: `${values.name}`,         
          startsAt: values.startsAt,
          endsTime: values.endsTime,
          discountPercent: `${values.discountPercent}`,
          productIds: values.productIds,         
        };
        addDiscount(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your DiscountName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="name"
            label="DiscountName"
          >
            <Input
              type="text"
              id="name"
              size="large"
              placeholder="DiscountName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your DiscountName",
              },
            ]}
            hasFeedback
            name="discountPercent"
            label="DiscountPercent"
          >
            <Input
              type="number"
              id="discountPercent"
              size="large"
              placeholder="DiscountPercent"
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
            name="startsAt"
            label="StartsAt"
          >
            <DatePicker showTime />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
        <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="endsTime"
            label="EndsTime"
          >
            <DatePicker showTime />
          </Form.Item>
        </Col>
        <Col span={8}></Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
        <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="productIds"
            label="Products"
          >
            <Select
              mode="multiple"
              showSearch
              style={{ width: 200 }}
              placeholder="Search Product"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {optionsProduct}
            </Select>
          </Form.Item>
        </Col>        
      </Row>      
      <Button type="primary">Add</Button>
    </Form>
  );
}

export default AddDiscount;
