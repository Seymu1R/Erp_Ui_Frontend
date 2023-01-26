import React, { useEffect } from "react";
import { Col, Row, Input, Form } from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";
import { useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

function EditStock() {
  const { stockId } = useParams();
  const [form] = useForm();

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
  );
}

export default EditStock;
