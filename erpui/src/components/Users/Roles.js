import React from "react";
import { Table } from "antd";
import './Roles.scss'
import Button from "react-bootstrap/Button";
const columns = [
  {
    title: "Roles",
    dataIndex: "roles",
    key: "roles",
  },  
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => (
      <div className="d-flex " >
        <Button className="margin " variant="danger">Delete</Button>
        <Button variant="primary">Edit</Button>        
      </div>
    ),
  },
];
const data = [
  {
    key: 1,
    roles: "John Brown",
    age: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description:
      "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description:
      "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
];

function Roles() {
  return (
    <Table
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== "Not Expandable",
    }}
    dataSource={data}
  />
  )
}

export default Roles