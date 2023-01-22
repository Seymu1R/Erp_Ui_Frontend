import React, { useState, useEffect, useContext } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, DatePicker, Form, Select } from "antd";
import { Option } from "antd/es/mentions";
import Button from "react-bootstrap/Button";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { productservices } from "../APIs/Services/ProductServices";
import { useForm } from "antd/es/form/Form";

function UpdateDiscount() {
  const [{ id }] = useContext(ErpContext);
  const [products, setProducts] = useState([]);
  const [form] = useForm();
  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProducts(products.data);
    });
    discountservices.getDiscount(id).then(({ data: discount }) => {
      form.setFieldsValue({
        name: discount.data.name,
        discountPercent: discount.data.discountPercent,
      });
    });
  }, [id, form]);

  const optionsProduct = products.map((product) => {
    return <Option value={product.id}>{product.name}</Option>;
  });

  const updateDiscount = (body) => {
    discountservices
      .updateDiscount(body)
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
        const Obj = {
          name: `${values.name}`,
          startsAt: values.startsAt,
          endsTime: values.endsTime,
          discountPercent: `${values.discountPercent}`,
          productIds: values.caregoryId,
        };
        updateDiscount(Obj);
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
        <Col span={8}>
          {" "}
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

      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
    </Form>
  );
}

export default UpdateDiscount;
