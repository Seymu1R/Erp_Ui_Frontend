import React, { useContext, useState, useEffect } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DiscountHeader from "./DiscountHeader";
import { discountservices } from "../APIs/Services/DiscountsServices";
import DeleteModal from "../UI/DeleteModal";
import Loading from "../UI/Loading";

function DiscountList() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] = useContext(ErpContext);
  const [discountList, setDiscountList] = useState([]);
  

  useEffect(() => {
    discountservices.getAllDiscounts().then(({ data: Products }) => {
      setDiscountList(Products.data);
    }).finally(setLoading(false));
  }, [loading, setLoading]);

  const deleteDiscount = (id) => {
    discountservices.deleteDiscount(id).then((data) => {
      console.log(data.message);
      setLoading(true)
    });
  };

  const deleteMOdalHandling = (id) => {
    
    setId(id);
    setDeleteState(true);
  };

  const returnTime = (date) => {
    return new Date(date)
  }


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      filters: discountList.map((discount) => {
        return { text: discount.name, value: discount.name };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: "25%",
    },
    {
      title: "StartTime",
      dataIndex: "startsAt",
      render: (startsAt) => returnTime(startsAt).toLocaleString("en-US")
    },
    {
      title: "EndTime",
      dataIndex: "endsTime",
      render: (endsTime) => returnTime(endsTime).toLocaleString("en-US")
    },
    {
      title: "DiscountAmount",
      dataIndex: "discountPercent",
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

          <Link to={`/discountlist/view/${record.id}`}>
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
