import React, { useState } from "react";
import { Col, Row, Input, Button, Form } from "antd";
import { brandservices } from "../APIs/Services/BrandsService";
import { useNavigate } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function AddBrand() {
  const navigation = useNavigate();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  const addBrand = (body) => {
    brandservices
      .createBrand(body)
      .then(({ data: response }) => {
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
  };

  return (
    <>
      {modalHandler && (
        <ErorModal usename={errorName} setmodalHandler={setModalHandler} />
      )}
      <Form
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const postObj = {
            brandName: `${values.brandName}`,
          };
          addBrand(postObj);
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
          Add
        </Button>
      </Form>
    </>
  );
}

export default AddBrand;
