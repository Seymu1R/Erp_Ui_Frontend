import React, {useEffect, useState} from "react";
import { Col, Row, Input, Button, Select, Form } from "antd";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import { productservices } from "../APIs/Services/ProductServices";

function PurchaseCommerceAdd() {

  const [products, setProducts] = useState([]);
  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProducts(products.data);
    });
  }, []);

  const optionsProduct = products.map((product) => {
    return <Option value={product.id}>{product.name}</Option>;
  });


  return (
    <Form>
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
        </Col>
      </Row>
      <Link to="/addpurchase">
      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
      </Link>
    </Form>
  );
}

export default PurchaseCommerceAdd;
