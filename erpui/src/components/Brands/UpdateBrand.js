import React, { useEffect, useState } from "react";
import { Col, Row, Input, Button, Form } from "antd";
import { brandservices } from "../APIs/Services/BrandsService";
import { useForm } from "antd/es/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function UpdateBrand() {
  const [form] = useForm();
  const navigation = useNavigate()
  const {barndId} = useParams();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

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
      .then(({data : response}) => {
        if (response.statusCode) {
          navigation("/brands");
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErrorname("Oops, something went wrong");
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    }
  return (
    <>
     {modalHandler && (
        <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
      )}
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
    </>    
  );
}

export default UpdateBrand;
