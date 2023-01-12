import React from "react";
import { Table , Dropdown, Space} from "antd";
import { DownOutlined } from "@ant-design/icons";
import CustomerHeader from "./CustomerHeader";
import { Link } from "react-router-dom";
const items = [
    {
      label: <Link >View</Link>,
      key: '0',
    },
    {
      label: <Link >Edit</Link>,
      key: '1',
    },
    {
        label: <Link >Delete</Link>,
        key: '2',
    },
    {
        label: <Link >Deactive</Link>,
        key: '3',
    },    
  ];
const columns = [
  {
    title: "CustomerCode",
    dataIndex: "customercode",
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
    title: "BusinessName",
    dataIndex: "businessname",
  },
  {
    title: "Name",
    dataIndex: "name",
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
    title: "CreditLimit",
    dataIndex: "creditlimit",
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
    title: "Totalsale",
    dataIndex: "totalsale",
    sorter: (a, b) => a.totalsale - b.totalsale,
  },
  {
    title: "Totalsalereturn",
    dataIndex: "totalsalereturn",
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
    render: () => (
        <Dropdown
    menu={{
      items,
    }}
    trigger={['click']}
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
const CustomerList = () => (
  <>
    <CustomerHeader></CustomerHeader>{" "}
    <Table columns={columns} dataSource={data} onChange={onChange} />
  </>
);
export default CustomerList;
