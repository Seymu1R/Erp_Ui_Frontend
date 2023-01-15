import React from "react";
import { Col, Row, Input, Button, Upload } from "antd";
import { DatePicker, Space, Select , message} from "antd";
import { UploadOutlined } from '@ant-design/icons';

function AddProduct() {
    const onChange = (value, dateString) => {
        console.log("Selected Time: ", value);
        console.log("Formatted Selected Time: ", dateString);
      };
      const onOk = (value) => {
        console.log("onOk: ", value);
      };
    
      const options = [];
      for (let i = 10; i < 36; i++) {
        options.push({
          value: i.toString(36) + i,
          label: i.toString(36) + i,
        });
      }
      const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
      const props = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };
  return (
    <form>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label htmlFor="name">Name</label>
        <Input type="text" id="name" size="large" placeholder="Name" />
      </Col>
      <Col span={8}>
        <label htmlFor="name">SkuCode</label>
        <Input type="name" id="skucode" size="large" placeholder="SkuCode" />
      </Col>
      <Col span={8}>
        <label htmlFor="barcode">BarCode</label>
        <Input type="text" id="barcode" size="large" placeholder="BarCode" />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label style={{ width:"100%" }} htmlFor="amount">Image</label>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Col>
      <Col span={8}>
        <label htmlFor="desc">Description</label>
        <Input type="text" id="desc" size="large" placeholder="Description" />
      </Col>
      <Col span={8}>
        <label htmlFor="purchaseprice">PurchasePrice</label>
        <Input
          type="number"
          id="purchaseprice"
          size="large"
          placeholder="PurchasePrice"
        />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label htmlFor="sellingprice">SellingPrice</label>
        <Input
          type="number"
          id="sellingprice"
          size="large"
          placeholder="SellingPrice"
        />
      </Col>
      <Col span={8}>
        <label htmlFor="alertquantity">AlertQuantity</label>
        <Input
          type="number"
          id="alertquantity"
          size="large"
          placeholder="AlertQuantity"
        />
      </Col>
      <Col span={8}>
        <label htmlFor="weight">Weight</label>
        <Input
          type="number"
          id="weight"
          size="large"
          placeholder="PurchasePrice"
        />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label>ProduceDate</label>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <DatePicker showTime onChange={onChange} onOk={onOk} />
        </Space>
      </Col>
      <Col span={8}>
        <label>ExpirationDate</label>
        <Space direction="vertical" size={12} style={{ width: "100%" }}>
          <DatePicker showTime onChange={onChange} onOk={onOk} />
        </Space>
      </Col>
      <Col span={8}>
        <label>Unit</label>
        <Select
          defaultValue="Kg"
          style={{
            width: "100%",
          }}
          allowClear
          options={[
            {
              value: "kg",
              label: "Kg",
            },
          ]}
        />
      </Col>
    </Row>
    <Row style={{ marginBottom: "20px" }}>
      <Col span={8}>
        <label>Category</label>
        <Select
          defaultValue="Electronic"
          style={{
            width: "100%",
          }}
          allowClear
          options={[
            {
              value: "electronic",
              label: "Electronic",
            },
          ]}
        />
      </Col>
      <Col span={8}>
        <label>Brand</label>
        <Select
          defaultValue="Apple"
          style={{
            width: "100%",
          }}
          allowClear
          options={[
            {
              value: "apple",
              label: "Apple",
            },
          ]}
        />
      </Col>
      <Col span={8}>
        <label htmlFor="unit">Suppliers</label>
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          onChange={handleChange}
          tokenSeparators={[","]}
          options={options}
        />
      </Col>
    </Row>

    <Button type="primary">Add</Button>
  </form>
  );
}

export default AddProduct;
