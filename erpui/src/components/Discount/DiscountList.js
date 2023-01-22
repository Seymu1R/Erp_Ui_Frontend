import React, { useContext, useState, useEffect } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DiscountHeader from "./DiscountHeader";
import { discountservices } from "../APIs/Services/DiscountsServices";
import DeleteModal from "../UI/DeleteModal";

function DiscountList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [discountList, setDiscountList] = useState([]);

  useEffect(() => {
    discountservices.getAllDiscounts().then(({ data: Products }) => {
      setDiscountList(Products.data);
    });
  }, []);

  const deleteDiscount = (id) => {
    discountservices.deleteDiscount(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "StartTime",
      dataIndex: "startsAt",
    },
    {
      title: "EndTime",
      dataIndex: "endsTime",
    },
    {
      title: "DiscountAmount",
      dataIndex: "discountAmount",
    },
    {
      title: "DiscountType",
      dataIndex: "discountType",
      render: (discountType) => (discountType === 1 ? "Fixed" : "Percentage"),
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

          <Link to="/discountlist/view">
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
      {deleteState && <DeleteModal deleteItem={deleteDiscount} />}
      <DiscountHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={discountList}
      />
    </>
  );
}

export default DiscountList;
