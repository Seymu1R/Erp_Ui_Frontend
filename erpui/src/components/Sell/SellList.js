import React from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import SellHeader from "./SellHeader";

function SellList() {
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
      title: "InvoiceNo",
      dataIndex: "invoiceno",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.invoiceno - b.invoiceno,
    },
    {
      title: "InvoiceStatuse",
      dataIndex: "invoicestatuse",
      filters: [
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Proforma",
          value: "Proforma",
        },
        {
          text: "Final",
          value: "Final",
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
      title: "Customer",
      dataIndex: "customer",
    },
    {
      title: "Stock",
      dataIndex: "stock",
    },
    {
      title: "Total",
      dataIndex: "total",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "ShippingStatus",
      dataIndex: "shippingstatus",
      filters: [
        {
          text: "Ordered",
          value: "ordered",
        },
        {
          text: "Packed",
          value: "packed",
        },
        {
          text: "Shipped",
          value: "shipped",
        },
        {
          text: "Delivered",
          value: "delivered",
        },
        {
          text: "Cancelled",
          value: "cancelled",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
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
      <SellHeader />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default SellList;
