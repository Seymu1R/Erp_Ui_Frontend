import React from 'react'
import { Col, Row, Input, Select, Tooltip, Table , Dropdown, Space  } from "antd";
import { AppstoreAddOutlined , DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function UpdatePurchase() {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
      };
      const items = [
        {
          label: (
            <Link to="/units/update">
              <Button variant="warning">Edit</Button>
            </Link>
          ),
          key: "1",
        },
        {
          label: <Button variant="danger">Delete</Button>,
          key: "2",
        },
      ];
      const columns = [
        {
          title: "ProductName",
          dataIndex: "productname"     
        },
        {
          title: "PurchaseStatus",
          dataIndex: "purchasestatus",
          filters: [
            {
              text: "Received",
              value: "Received",
            },
            {
              text: "Pending",
              value: "Pending",
            },
            {
              text: "Ordered",
              value: "Ordered",
            },
          ],
          onFilter: (value, record) => record.address.startsWith(value),
          filterSearch: true,
         
        },
        {
            title: "PayTerm",
            dataIndex: "payterm",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.payterm - b.payterm,
          },
          {
            title: "AdditionalNote",
            dataIndex: "additionalnote"        
          },
          {
            title: "Supplier",
            dataIndex: "supplier"        
          },
          {
            title: "Stock",
            dataIndex: "stock"        
          },
          {
            title: "CreatedDate",
            dataIndex: "createddate",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.createddate - b.createddate,        
          },
          {
            title: "CreatedBy",
            dataIndex: "createdby",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.createdby - b.createdby,        
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
          name: "xxx",
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
              <label style={{ width: "100%" }}>Supplier</label>
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
              <label htmlFor="note">AdditionalNote</label>
              <Input
                type="text"
                id="note"
                size="large"
                placeholder="AdditionalNote"
              />
            </Col>
            <Col span={8}>
              <label htmlFor="phonenumber">PhoneNumber</label>
              <Input
                type="phone"
                id="phonenumber"
                size="large"
                placeholder="PhoneNumber"
              />
            </Col>
            <Col span={8}>
              <label style={{width:"100%"}} >ProductCommerce</label>
              <Link to='/addpurchasecommerce' >
              <Tooltip title="Add PurchaseCommerce" color={"#2b80ec"}>
                <AppstoreAddOutlined
                  style={{
                    fontSize: "30px",
                    color: "#2b80ec",
                    cursor : "pointer",
                    marginLeft:"20px"
                  }}
                />
              </Tooltip>
              </Link>          
            </Col>
          </Row>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <label  style={{width:"100%"}} htmlFor="note">PurchaseStatus</label>
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
          <Button variant="primary">Update</Button>
        </form>
      );
}

export default UpdatePurchase