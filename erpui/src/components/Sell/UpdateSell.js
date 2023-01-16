import React from "react";
import { Col, Row, Input, Select, Tooltip, Table, Dropdown, Space } from "antd";
import { AppstoreAddOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function UpdateSell() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
    
      const items = [
        {
          label: <Button variant="info">View</Button>,
          key: "0",
        },
        {
          label: (
            <Link to="/sales/update">
              <Button variant="warning">Edit</Button>
            </Link>
          ),
          key: "1",
        },
        {
          label: <Button variant="danger">Delete</Button>,
          key: "2",
        },
        {
          label: <Button variant="primary">Deactive</Button>,
          key: "3",
        },
      ];
      const columns = [
        {
          title: "ProductName",
          dataIndex: "productname",
        },
        {
          title: "ProductAmount",
          dataIndex: "productamount",
        },
        {
          title: "SubTotal",
          dataIndex: "subtotal",
        },
        {
          title: "Actions",
          dataIndex: "action",
          render: () => (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Link onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined />
                </Space>
              </Link>
            </Dropdown>
          ),
        },
      ];
      const data = [
        {
          key: "1",
          customercode: "xxx",
          age: 32,
          address: "New York No. 1 Lake Park",
        },
        {
          key: "2",
          customercode: "ppp",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          key: "3",
          customercode: "yyy",
          age: 32,
          address: "Sidney No. 1 Lake Park",
        },
        {
          key: "4",
          customercode: "xyz",
          age: 32,
          address: "London No. 2 Lake Park",
        },
      ];
      const onChange = (pagination, filters, sorter, extra) => {
        console.log("params", pagination, filters, sorter, extra);
      };
    
      return (
        <form>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <label style={{ width: "100%" }}>Customer</label>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </Col>
            <Col span={8}>
              <label style={{ width: "100%" }}>Stock</label>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </Col>
            <Col span={8}>
              <label htmlFor="payterm">PayTerm</label>
              <Input
                type="number"
                id="payterm"
                size="large"
                placeholder="PayTerm"
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <label htmlFor="note">SellNote</label>
              <Input
                type="text"
                id="note"
                size="large"
                placeholder="AdditionalNote"
              />
            </Col>
            <Col span={8}>
              <label htmlFor="shippingadress">ShippingAddress</label>
              <Input
                type="phone"
                id="shippingadress"
                size="large"
                placeholder="ShippingAddress"
              />
            </Col>
            <Col span={8}>
              <label style={{ width: "100%" }}>ProductCommerce</label>
              <Link to="/addpurchasecommerce">
                <Tooltip title="Add PurchaseCommerce" color={"#2b80ec"}>
                  <AppstoreAddOutlined
                    style={{
                      fontSize: "30px",
                      color: "#2b80ec",
                      cursor: "pointer",
                      marginLeft: "20px",
                    }}
                  />
                </Tooltip>
              </Link>
            </Col>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
            <label style={{ width: "100%" }}>Discount</label>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </Col> 
            <Col span={8}>
            <label style={{ width: "100%" }}>InvoiceStatuses</label>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </Col> 
            <Col span={8}>
            <label style={{ width: "100%" }}>ShippingStatuses</label>
              <Select
                defaultValue="lucy"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "jack",
                    label: "Jack",
                  },
                  {
                    value: "lucy",
                    label: "Lucy",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                  },
                  {
                    value: "Yiminghe",
                    label: "yiminghe",
                  },
                ]}
              />
            </Col>
            
            
          </Row>
          <Table columns={columns} dataSource={data} onChange={onChange} />
          <Button variant="primary">Add</Button>
        </form>
      );
}

export default UpdateSell