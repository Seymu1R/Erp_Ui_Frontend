import React, {useEffect, useContext, useState} from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input ,Form} from "antd";
import Button from "react-bootstrap/Button";
import { stockservices } from "../APIs/Services/StockService";

function EditStock() {

  const [{ id }] = useContext(ErpContext);
  const [stockItem, setStock] = useState({});

  useEffect(()=>{
  stockservices.getStock(id).then(({data:stock})=>{
    setStock(stock.data)
  })
  },[id])

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
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const Obj = {
          id: `${id}`,
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
              defaultValue={stockItem.buisnessLocation}
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

export default EditStock