import React from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PurchaseHeader from "./PurchaseHeader";

function PurchaseList() {
  const items = [
    {
        label: (
          <Link to="/purchase/view">
            <Button variant="info">View</Button>
          </Link>
        ),
        key: "1",
      },
    {
      label: (
        <Link to="/purchase/update">
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
      title: "PurchaseCode",
      dataIndex: "purchasecode"     
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
    <>
      <PurchaseHeader/>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default PurchaseList;
