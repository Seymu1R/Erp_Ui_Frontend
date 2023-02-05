import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import './Roles.scss'
import Button from "react-bootstrap/Button";
import { roleservice } from "../APIs/Services/RoleServices";
import ErpContext from "../store/erp-context";

function Roles() {
  const [{auth}] = useContext(ErpContext)
  const[rolearr, setRoles] = useState([])
  const config = { headers: { Authorization: `Bearer ${auth.AccesToken}` } };

  useEffect(()=>{
    roleservice.getAllRoles(config).then(({data : roles}) => {
      setRoles(roles.data)
    })
  },[])

  const deleteRole = (id, config) => {
    roleservice.deleteRole(id).then(data => {
      window.alert("Deleted")
    })
  }

  const columns = [
    {
      title: "Roles",
      dataIndex: "name",
      key: "name",
    },  
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex " >
          <Button id={record.id} onClick={()=>{deleteRole(record.id)}} className="margin " variant="danger">Delete</Button>
          <Button variant="primary">Edit</Button>        
        </div>
      ),
    },
  ];

  return (
    <Table
    columns={columns}
    rowKey={record => record.id}   
    dataSource={rolearr}
  />
  )
}

export default Roles