import React, { useEffect, useState, useContext } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import "./Roles.scss";
import Button from "react-bootstrap/Button";
import UsersUp from "./UsersUp";
import { Link } from "react-router-dom";
import { userservice } from "../APIs/Services/UserServices";
import DeleteModal from "../UI/DeleteModal";

const Users = () => {
  const [{ deleteState, setDeleteState, setId, auth }] = useContext(ErpContext);
  const [users, setUsers] = useState([]);
  const config = { headers: { Authorization: `Bearer ${auth.AccesToken}` } };

  useEffect(() => {
    userservice.getAllUsers(config).then(({ data: usersData }) => {
      setUsers(usersData.data);
    });
  }, [deleteState]);

  const deleteUser = (id) => {
    userservice.deleteUser(id, config).then((data) => {
      console.log(data);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      filters: users.map((user) => {
        return { text: user.userName, value: user.userName };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.userName.startsWith(value),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filters: users.map((user) => {
        return { text: user.name, value: user.name };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
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
          <Button
            id={record.id}
            onClick={() => {
              deleteMOdalHandling(record.id);
              deleteUser(record.id);
            }}
            className="margin "
            variant="danger"
          >
            Delete
          </Button>
          <Link to={`/edituser/${record.id}`}>
            <Button id={record.id} variant="primary">
              Edit
            </Button>
          </Link>
          <Link to={`/userinfo/${record.id}`}>
            <Button id={record.id} variant="info">
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {deleteState && <DeleteModal deleteItem={deleteUser} />}
      <UsersUp />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={users}
      />
    </>
  );
};
export default Users;
