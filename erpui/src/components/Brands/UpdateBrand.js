import React, { useEffect } from "react";
import { Col, Row, Input, Button, Form } from "antd";
import { brandservices } from "../APIs/Services/BrandsService";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBrand() {
  const [form] = useForm();
  const navigation = useNavigate()
  const {barndId} = useParams();

  useEffect(() => {
    brandservices.getBrand(barndId).then(({ data: brand }) => {
      form.setFieldsValue({
        brandName: brand.data.brandName,
      });
    });
  }, [barndId, form]);

  const editBrand = (body) => {
    brandservices
      .updateBrand(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigation('/brands'));
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: barndId,
          brandName: `${values.brandName}`,
        };
        editBrand(Obj);
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
        Update
      </Button>
    </Form>
  );
}

export default UpdateBrand;
