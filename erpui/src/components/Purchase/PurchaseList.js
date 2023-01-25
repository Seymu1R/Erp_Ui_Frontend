import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import PurchaseHeader from "./PurchaseHeader";
import { purchaseservices } from "../APIs/Services/PurchaseServices";
import DeleteModal from "../UI/DeleteModal";

function PurchaseList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    purchaseservices.getAllPurchases().then(({data:purchases}) => {
      setPurchaseList(purchases.data)
    })
  },[])

  const deletePurchase = (id) => {
    purchaseservices.deletePurchase(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "PurchaseCode",
      dataIndex: "purchaseCode",
    },
    {
      title: "PurchaseStatus",
      dataIndex: "purchaseStatus",
      filters: [
        {
          text: "Received",
          value: "Received",
        },
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Ordered",
          value: "Ordered",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
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
          <Link to="/purchase/update">
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

          <Link to="/productlist/view">
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
      {deleteState && <DeleteModal deleteItem={deletePurchase} />}
      <PurchaseHeader />
      <Table columns={columns} dataSource={purchaseList}/>
    </>
  );
}

export default PurchaseList;
