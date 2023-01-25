import React, { useEffect, useState } from "react";
import { Col, Row, Input, Button, Select, Form } from "antd";
import { Option } from "antd/es/mentions";
import { productservices } from "../APIs/Services/ProductServices";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";

function SellCommerceAdd({sellId}) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProducts(products.data);
    });
  }, []);

  const optionsProduct = products.map((product) => {
    return <Option key={product.id} value={product.id}>{product.name}</Option>;
  });

  const addPurchaseCommerce = (body) => {
    productcommerceservices
      .createProductCommerce(body)
      .then(({ data: productCommerce }) => {
        console.log(productCommerce.data);
      });
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          productId: values.productId,
          productAmount: `${values.productAmount}`,
          sellId: `${sellId}`          
        };
        addPurchaseCommerce(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="productAmount"
            label="ProductAmount"
          >
            <Input
              type="number"
              id="productAmount"
              size="large"
              placeholder="ProductAmount"
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
            name="productId"
            label="Products"
          >
            <Select              
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
        <Col span={8}>
          <Button htmlType={"submit"} type="primary">
            Add Product
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SellCommerceAdd;
