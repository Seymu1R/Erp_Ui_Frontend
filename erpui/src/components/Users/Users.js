import React from "react";
import { Table } from "antd";
import './Roles.scss'
import Button from "react-bootstrap/Button";
import UsersUp from "./UsersUp";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "UserName",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => (
      <div className="d-flex " >
        <Button className="margin " variant="danger">Delete</Button>
        <Link to = '/edituser' > <Button variant="primary">Edit </Button> </Link>  
        <Link to = '/userinfo' > <Button variant="info">View</Button></Link> 
      </div>
    ),
  },
];
const data = [
  {
    key: 1,
    username: "John Brown",
    name: "John Brown",
    role: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 3,
    username: "John Brown",
    name: "John Brown",
    role: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 5,
    username: "John Brown",
    name: "John Brown",
    role: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 4,
    username: "John Brown",
    name: "John Brown",
    role: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    username: "John Brown",
    name: "John Brown",
    role: 32,
    email: "New York No. 1 Lake Park",
    description:
      "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  }
];
const Users = () => (
  <>
   <UsersUp/>
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
  </> 
);
export default Users;
