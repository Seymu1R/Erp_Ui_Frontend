import React, {useContext, useState, useEffect} from 'react'
import ErpContext from '../store/erp-context';
import { Col, Row, Input, Button , Form } from "antd";
import { brandservices } from '../APIs/Services/BrandsService';


function UpdateBrand() {
  const [{ id }] = useContext(ErpContext);
  const [brandItem, setBrand] = useState({});

  useEffect(()=>{
  brandservices.getBrand(id).then(({data:brand})=>{
    setBrand(brand.data)
  })
  },[id])

  const editBrand = (body) => {
    brandservices
      .updateBrand(body)
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
            defaultValue={brandItem.brandName}
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
  )
}

export default UpdateBrand