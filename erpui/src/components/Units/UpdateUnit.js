import React, { useContext, useEffect } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, Button, Form } from "antd";
import { unitservices } from "../APIs/Services/UnitsServices";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

function UpdateUnit() {
  const [{ id }] = useContext(ErpContext);
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    unitservices.getUnit(id).then(({ data: unit }) => {
      form.setFieldsValue({
        unitName: unit.data.unitName,
        unitType: unit.data.unitType,
      });
    });
  }, [id, form]);

  const editBrand = (body) => {
    unitservices
      .updateUnit(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(
        navigate("/units")
      );;
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: `${id}`,
          unitName: `${values.unitName}`,
          unitType: `${values.unitType}`,
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
                message: "Please enter your unitName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="unitName"
            label="UnitName"
          >
            <Input
              type="text"
              id="unitName"
              size="large"
              placeholder="unitName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your UnitType",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="unitType"
            label="UnitType"
          >
            <Input             
              type="text"
              id="unitType"
              size="large"
              placeholder="UnitType"
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

export default UpdateUnit;
