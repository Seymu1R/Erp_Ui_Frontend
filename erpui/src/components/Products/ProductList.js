import React from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import ProductHeader from "./ProductHeader";

function ProductList() {
  const items = [
    {
      label: <Button variant="info">View</Button>,
      key: "0",
    },
    {
      label: (
        <Link to='/productlist/updateproduct'>
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
      title: "Image",
      dataIndex: "image",     
    },
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "xxx",
          value: "xxx",
        },
        {
          text: "zzz",
          value: "zzz",
        },
        {
          text: "xyz",
          value: "xyz",
        },
        {
          text: "ppp",
          value: "ppp",
        },
      ],
      filterSearch: true,
      onFilter: (value, record) => record.customercode.startsWith(value),
      width: "30%",
    },
    {
      title: "UnitPrice",
      dataIndex: "unitprice",
    },
    {
      title: "SellingPrice",
      dataIndex: "sellingprice",
     
      
      width: "30%",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },   
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Activestatus",
      dataIndex: "activestatus",
      filters: [
        {
          text: "Active",
          value: "active",
        },
        {
          text: "Deactive",
          value: "deactive",
        },
      ],
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
    <>
      <ProductHeader/>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default ProductList;
