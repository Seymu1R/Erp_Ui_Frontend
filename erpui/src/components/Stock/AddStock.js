import React, { useState } from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";
import { useNavigate } from "react-router-dom";
import ErorModal from "../UI/ErorModal";

function AddStock() {
  const navigate = useNavigate();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  const addStock = (body) => {
    stockservices
      .createStock(body)
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/stocklist");
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
            buisnessLocation: `${values.buisnessLocation}`,
          };
          addStock(postObj);
        }}
      >
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your BusinessLocation",
                  whitespace: true,
                  min: 3,
                  max: 20,
                },
              ]}
              hasFeedback
              name="buisnessLocation"
              label="BusinessLocation"
            >
              <Input
                type="text"
                id="buisnessLocation"
                size="large"
                placeholder="BusinessLocation"
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
export default AddStock;
