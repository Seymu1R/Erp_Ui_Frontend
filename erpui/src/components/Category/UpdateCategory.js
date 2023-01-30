import React, { useEffect } from "react";
import { Col, Row, Input, Button, Form } from "antd";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCategory() {
  const [form] = useForm();
  const navigate = useNavigate()
  const {cetegoryId} = useParams()

  useEffect(() => {
    categoriesservices.getCategory(cetegoryId).then(({ data: category }) => {
      form.setFieldsValue({
        name: category.data.name,
      });
    });
  },[cetegoryId, form]);

  const updateCategory = (body) => {
    categoriesservices
      .updateCategory(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigate('/categories'));
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postCategory = {
          id: cetegoryId,
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
        Update
      </Button>
    </Form>
  );
}

export default UpdateCategory;
