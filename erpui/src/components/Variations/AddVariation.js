import React from "react";
import { Col, Row, Input, Button, Select, Form } from "antd";
import { variationservices } from "../APIs/Services/VariationServices";

function AddVariation() {
  const addVariation = (body) => {
    variationservices
      .createVariation(body)
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
          variationName: `${values.variationName}`,
          variationValues: values.variationValues.map((item) => {
            return item;
          }),
        };
        addVariation(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your VariationName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="variationName"
            label="VariationName"
          >
            <Input
              type="text"
              id="variationName"
              size="large"
              placeholder="VariationName"
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
           name="variationValues" label="Variations">
            <Select
             defaultValue={"VariationValues"}
              mode="tags"
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
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

export default AddVariation;
