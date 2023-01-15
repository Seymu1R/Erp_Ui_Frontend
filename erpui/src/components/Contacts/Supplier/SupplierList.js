import React from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";
import SupplierHeader from "./SupplierHeader";

function SupplierList() {
  const items = [
    {
      label: <Button variant="info">View</Button>,
      key: "0",
    },
    {
      label: (
        <Link to='/suppliers/updatesupplier'>
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
      title: "SupplierCode",
      dataIndex: "supplierCode",
      fixed: "left",
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
    },
    {
      title: "BusinessName",
      dataIndex: "businessname",
    },

    {
      title: "Taxnumber",
      dataIndex: "taxnumber",
      filterSearch: true,
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
      onFilter: (value, record) => record.name.startsWith(value),
      width: "30%",
    },
    {
      title: "Address",
      dataIndex: "address",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: "40%",
    },
    {
      title: "Phonenumber",
      dataIndex: "phonenumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "PayTerm",
      dataIndex: "payterm",
    },
    {
      title: "TotalPurchase",
      dataIndex: "totalpurchase",
      sorter: (a, b) => a.totalsale - b.totalsale,
    },
    {
      title: "TotalPurchaseReturn",
      dataIndex: "totalpurchasereturn",
      sorter: (a, b) => a.totalsalereturn - b.totalsalereturn,
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
      fixed: "right",
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
      <SupplierHeader/>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default SupplierList;
