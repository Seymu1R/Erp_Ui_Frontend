import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PurchaseHeader from "./PurchaseHeader";
import { purchaseservices } from "../APIs/Services/PurchaseServices";
import DeleteModal from "../UI/DeleteModal";
import { supplierservices } from "../APIs/Services/SupplierServices";
import Loading from "../UI/Loading";

function PurchaseList() {
  const [
    {
      deleteState,
      setDeleteState,
      setId,
      total,
      setTotal,
      loading,
      setLoading,
    },
  ] = useContext(ErpContext);
  const [purchaseList, setPurchaseList] = useState([]);
  const [supplier, setSuppliers] = useState({});

  useEffect(() => {
    setLoading(false)
    purchaseservices.getAllPurchases().then(({ data: purchases }) => {
      setPurchaseList(purchases.data);
    });
  }, [deleteState, loading, setLoading]);

  const deletePurchase = (id) => {
    purchaseservices.deletePurchase(id).then((data) => {
      console.log(data.message);
      supplierservices.updateSupplier({
        id: `${supplier.id}`,
        totalPurchase: supplier.totalPurchase - total,
        businessName: `${supplier.businessName}`,
        email: `${supplier.email}`,
        taxNumber: `${supplier.taxNumber}`,
        payTerm: supplier.payTerm,
        address: `${supplier.address}`,
        phoneNumber: supplier.phoneNumber,
      });
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    purchaseservices.getPurchase(id).then(({ data: purchase }) => {
      setTotal(purchase.data.total);
      supplierservices
        .getSupplier(purchase.data.supplierId)
        .then(({ data: supplier }) => {
          setSuppliers(supplier.data);
        });
    });
    setDeleteState(true);
  };

  const columns = [
    {
      title: "PurchaseCode",
      dataIndex: "purchaseCode",
      filters: purchaseList.map((purchase) => {
        return { text: purchase.purchaseCode, value: purchase.purchaseCode };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.purchaseCode.startsWith(value),
      width: "25%",
    },
    {
      title: "PurchaseStatus",
      dataIndex: "purchaseStatus",
      render: (purchaseStatus) =>
        purchaseStatus === 1 ? "Pending" : "Ordered",
    },
    {
      title: "PayTerm",
      dataIndex: "payTerm",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.payterm - b.payterm,
    },
    {
      title: "AdditionalNote",
      dataIndex: "additionalNote",
    },
    {
      title: "Total",
      dataIndex: "total",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
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
          <Link to={`/purchase/update/${record.id}`}>
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="warning"
            >
              Edit
            </Button>
          </Link>

          <Link to={`view/${record.id}`}>
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="info"
            >
              View
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading && <Loading />}
      {deleteState && <DeleteModal deleteItem={deletePurchase} />}
      <PurchaseHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={purchaseList}
      />
    </>
  );
}

export default PurchaseList;
