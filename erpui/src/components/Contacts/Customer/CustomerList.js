import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import CustomerHeader from "./CustomerHeader";
import { Link } from "react-router-dom";
import ErpContext from "../../store/erp-context";
import DeleteModal from "../../UI/DeleteModal";
import { customerservice } from "../../APIs/Services/CustomerServices";
import Loading from "../../UI/Loading";

function CustomerList() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [customerlist, setCustomerList] = useState([]);

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomerList(customers.data);
    }).finally(setLoading(false));
  }, [loading,setLoading]);

  const deleteCustomer = (id) => {
    customerservice.deleteCustomer(id).then((data) => {
      setLoading(true)
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
      filters: customerlist.map((customers) => {
        return { text: customers.customerCode, value: customers.customerCode };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.customerCode.startsWith(value),
    },
    {
      title: "BusinessName",
      dataIndex: "businessName",
      filters: customerlist.map((customers) => {
        return { text: customers.businessName, value: customers.businessName };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.businessName.startsWith(value)
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
      title: "Actions",
      dataIndex: "",
      key: "x",
      fixed: "right",
      width: "18%",
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
        </div>
      ),
    },
  ];
  return (
    <>
    {loading&&<Loading/>}      
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
