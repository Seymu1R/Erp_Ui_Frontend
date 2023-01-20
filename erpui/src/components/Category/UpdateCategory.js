import React, { useContext } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, Button, Form } from "antd";
import { categoriesservices } from "../APIs/Services/CategoryServices";

function UpdateCategory() {
  const [{ id }] = useContext(ErpContext);

  const updateCategory = (body) => {
    categoriesservices
      .updateCategory(body)
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
        const postCategory = {
          id: `${id}`,
          name: `${values.name}`,
        };
        updateCategory(postCategory);
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
            name="name"
            label="CategoryName"
          >
            <Input
              type="text"
              id="name"
              size="large"
              placeholder="CategoryName"
              style={{ width: "90%" }}
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

export default UpdateCategory;
