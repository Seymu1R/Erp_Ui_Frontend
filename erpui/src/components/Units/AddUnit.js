import React, { useState } from 'react'
import { Col, Row, Input, Button , Form} from "antd";
import { unitservices } from '../APIs/Services/UnitsServices';
import { useNavigate } from 'react-router-dom';
import ErorModal from '../UI/ErorModal';

function AddUnit() {
const [modalHandler, setModalHandler] = useState(false);
const [errorName, setErrorname] = useState("");
 const navigate =  useNavigate()

  const addUnit = (body) => {
    unitservices
      .createUnit(body)
      .then(({data:response}) => {
        if (response.statusCode) {
          navigate("/productlist");
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
    </>     
  )
}

export default AddUnit