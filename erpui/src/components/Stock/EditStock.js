import React, { useEffect, useState } from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import ErorModal from "../UI/ErorModal";

function EditStock() {
  const { stockId } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();
  const [modalHandler, setModalHandler] = useState(false);
  const [errorName, setErrorname] = useState("");

  useEffect(() => {
    stockservices.getStock(stockId).then(({ data: stock }) => {
      form.setFieldsValue({
        buisnessLocation: stock.data.buisnessLocation,
      });
    });
  }, [stockId, form]);

  const editStock = (body) => {
    stockservices
      .updateStock(body)
      .then(({data : response}) => {
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
    form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: `${stockId}`,
          buisnessLocation: `${values.buisnessLocation}`,
        };
        editStock(Obj);
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

export default EditStock;
