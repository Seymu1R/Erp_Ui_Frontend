import React from 'react'
import { Col, Row, Input, Button , Form} from "antd";
import { unitservices } from '../APIs/Services/UnitsServices';
import { useNavigate } from 'react-router-dom';

function AddUnit() {
 const navigate =  useNavigate()
  const addUnit = (body) => {
    unitservices
      .createUnit(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(
        navigate("/units")
      );
  };   

  return (
    <Form
    autoComplete="off"
    onFinish={(values) => {
      console.log(values);
      const postObj = {
        unitName: `${values.unitName}`,
        unitType: `${values.unitType}`
      };
      addUnit(postObj);
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
            placeholder="UnitName"
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
      Add
    </Button>
  </Form>     
  )
}

export default AddUnit