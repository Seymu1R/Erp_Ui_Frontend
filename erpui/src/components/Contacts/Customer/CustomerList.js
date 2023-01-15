import React, { useContext } from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import CustomerHeader from "./CustomerHeader";
import { Link } from "react-router-dom";
import ErpContext from "../../store/erp-context";
import DeleteModal from "../../UI/DeleteModal";

function CustomerList() { 

  const [{deleteState,setDeleteState}] = useContext(ErpContext);

  const c = () => {
    setDeleteState(true)
  }
 
  const items = [
    {
      label: <Button variant="info" >View</Button>,
      key: "0",
    },
    {
      label: <Link to = '/customers/updatecustomer' ><Button variant="warning">Edit</Button></Link>,
      key: "1",
    },
    {
      label: <Button variant="danger" onClick={c} >Delete</Button>,
      key: "2",
    },
    {
      label: <Button variant="primary" >Deactive</Button>,
      key: "3",
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
       { deleteState && <DeleteModal/>}
      <CustomerHeader></CustomerHeader>{" "}
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default CustomerList;
