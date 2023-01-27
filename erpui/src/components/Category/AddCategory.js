import React, { useEffect, useState } from "react";
import { Col, Row, Input, Button, Checkbox, Select, Form } from "antd";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import { useNavigate } from "react-router-dom";

function AddCategory() {
  const [parentCategoryhandler, setParentCategoryHandler] = useState(false);
  const navigation = useNavigate()

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    categoriesservices.getAllCategories().then(({ data: categories }) => {
      setCategoryList(categories.data);
    });
  }, []);

  const mainCategories = categoryList.filter((category) => {
    return category.isMain === true;
  });

  const options = mainCategories.map((category) => {
    return { value: category.id, label: category.name };
  });

  const addCategory = (body) => {
    categoriesservices
      .createCategory(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigation('/categories'));
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postCategoryparent = {
          name: `${values.name}`,
          isMain: values.isMain,
          parentId: `${values.parentId}`,
        };
        const postCategory = {
          name: `${values.name}`,
          isMain: values.isMain,
        };
        addCategory(parentCategoryhandler ? postCategory : postCategoryparent);
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
        <Col span={8}>
          <Form.Item
            name="isMain"
            label="Is Main?"
            valuePropName="checked"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Checkbox
              onChange={(e) => {
                setParentCategoryHandler(e.target.checked);
              }}
              style={{ marginLeft: "20px" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="parentId" label="ParentCategory">
            <Select
              disabled={parentCategoryhandler && true}
              defaultValue={"ParentCategory"}
              style={{
                width: "100%",
                marginLeft: "20px",
              }}
              options={options}
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

export default AddCategory;
