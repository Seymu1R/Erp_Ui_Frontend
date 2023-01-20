import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import CustomerHeader from "./CustomerHeader";
import { Link } from "react-router-dom";
import ErpContext from "../../store/erp-context";
import DeleteModal from "../../UI/DeleteModal";
import { customerservice } from "../../APIs/Services/CustomerServices";

function CustomerList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [customerlist, setCustomerList] = useState([]);

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomerList(customers.data);
    });
  }, [deleteState]);

  const deleteCustomer = (id) => {
    customerservice.deleteCustomer(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "CustomerCode",
      dataIndex: "customerCode",
    },
    {
      title: "BusinessName",
      dataIndex: "businessName",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Taxnumber",
      dataIndex: "taxNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phonenumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Totalsale",
      dataIndex: "totalSale",
      sorter: (a, b) => a.totalSale - b.totalSale,
    },
    {
      title: "Totalsalereturn",
      dataIndex: "totalSaleReturn",
      sorter: (a, b) => a.totalSaleReturn - b.totalSaleReturn,
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",

      render: (record) => (
        <div className="d-flex ">
          <Button
            id={record.id}
            onClick={() => {
              deleteMOdalHandling(record.id);
            }}
            className="margin "
            variant="danger"
          >
            Delete
          </Button>
          <Link to="/customers/updatecustomer">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id)
              }}
              variant="primary"
            >
              Edit
            </Button>
          </Link>
          <Link to="">
            <Button id={record.id} variant="info">
              Deactive
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  return (
    <>
      {deleteState && <DeleteModal deleteItem={deleteCustomer} />}
      <CustomerHeader></CustomerHeader>{" "}
      <Table
        scroll={{
          x: 1500,
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={customerlist}
      />
    </>
  );
}

export default CustomerList;
