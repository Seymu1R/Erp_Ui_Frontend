import React, { useContext, useEffect, useState } from "react";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import SupplierHeader from "./SupplierHeader";
import ErpContext from "../../store/erp-context";
import DeleteModal from "../../UI/DeleteModal";
import { supplierservices } from "../../APIs/Services/SupplierServices";

function SupplierList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
  }, [deleteState]);

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const deleteSupplier = (id) => {
    supplierservices.deleteSupplier(id).then((data) => {
      console.log(data.message);
    });
  };

  const columns = [
    {
      title: "SupplierCode",
      dataIndex: "supplierCode",
      filters: suppliers.map((suppliers) => {
        return { text: suppliers.supplierCode, value: suppliers.supplierCode };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.supplierCode.startsWith(value),
    },
    {
      title: "BusinessName",
      dataIndex: "businessName",
      filters: suppliers.map((suppliers) => {
        return { text: suppliers.businessName, value: suppliers.businessName };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.businessName.startsWith(value),
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
      title: "PayTerm",
      dataIndex: "payTerm",
    },
    {
      title: "TotalPurchase",
      dataIndex: "totalPurchase",
      sorter: (a, b) => a.totalPurchase - b.totalPurchase,
    },
    {
      title: "TotalPurchaseReturn",
      dataIndex: "totalPurchaseReturn",
      width: "13%",
      sorter: (a, b) => a.totalPurchase - b.totalPurchase
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
          <Link to="/suppliers/updatesupplier">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
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
      {deleteState && <DeleteModal deleteItem={deleteSupplier} />}
      <SupplierHeader />
      <Table
        scroll={{
          x: 1500,
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={suppliers}
      />
    </>
  );
}

export default SupplierList;
