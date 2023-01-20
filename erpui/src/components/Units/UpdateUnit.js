import React, { useContext, useState, useEffect } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, Button, Form } from "antd";
import { unitservices } from "../APIs/Services/UnitsServices";

function UpdateUnit() {
  const [{ id }] = useContext(ErpContext);
  const [unitItem, setUnit] = useState({});

  useEffect(() => {
    unitservices.getUnit(id).then(({ data: unit }) => {
      setUnit(unit.data);
    });
  }, [id]);

  const editBrand = (body) => {
    unitservices
      .updateUnit(body)
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
        const Obj = {
          id : `${id}`,
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
              defaultValue={unitItem.unitName}
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
              defaultValue={unitItem.unitType}
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
        Add
      </Button>
    </Form>
  );
}

export default UpdateUnit;
