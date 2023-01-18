import React, { useContext, useEffect , useState } from "react";
import { Table } from "antd";
import "./Roles.scss";
import Button from "react-bootstrap/Button";
import UsersUp from "./UsersUp";
import { Link } from "react-router-dom";
import { userservice } from "../APIs/Services/UserServices";
import ErpContext from "../store/erp-context";

const Users = () => {

  const [users, setUsers] = useState([])
  const [{setItem}] = useContext(ErpContext)

  useEffect(() => {
    userservice.getAllUsers().then(({ data: usersData }) => {
     setUsers(usersData.data)
    })     
    
  },[users]);

  const getUser = (id) =>{
    userservice.getUser(id).then(({data : user})=>{
      setItem(user.data)
    })
  }

  const deleteUser = (id) => {
   userservice.deleteUser(id).then(data => {
    console.log(data);
   })
  }

  const columns = [
  
    {
      title: "UserName",
      dataIndex: "surName",
      key: "surName",
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
      render: (record) => (
        <div className="d-flex ">
          <Button id={record.id} onClick={()=>{deleteUser(record.id)}} className="margin " variant="danger">
            Delete
          </Button>
          <Link to="/edituser">            
            <Button variant="primary">Edit </Button>
          </Link>
          <Link to="/userinfo">            
            <Button id={record.id} onClick={()=>{getUser(record.id)}} variant="info">View</Button>
          </Link>
        </div>
      ),
    },
  ];



 

  return (
    <>
      <UsersUp />
      <Table      
        rowKey={record => record.id}      
        columns={columns}       
        dataSource={users}
      />
    </>
  );
};
export default Users;
