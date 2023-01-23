import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import SellHeader from "./SellHeader";
import { sellservices } from "../APIs/Services/SellsServices";
import DeleteModal from "../UI/DeleteModal";

function SellList() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [sellList, setSellList] = useState([]);
  useEffect(() => {
    sellservices.getAllSells().then(({ data: sells }) => {
      setSellList(sells.data);
    });
  }, []);

  const sellModifiedByShippingStatus = sellList.map((sell) => {
    if (sell.shippingStatus === 1) {
      return { ...sell, ShippingStatus: "Ordered" };
    } else if (sell.shippingStatus === 2) {
      return { ...sell, ShippingStatus: "Shipped" };
    } else if (sell.shippingStatus === 3) {
      return { ...sell, ShippingStatus: "Delivered" };
    } else if (sell.shippingStatus === 4) {
      return { ...sell, ShippingStatus: "Cancelled" };
    }
    return "Error";
  });

  const sellModifiedByInvoiceStatus = sellModifiedByShippingStatus.map(
    (sell) => {
      if (sell.invoiceStatuse === 1) {
        return { ...sell, InvoiceStatus: "Draft" };
      } else if (sell.invoiceStatuse === 2) {
        return { ...sell, InvoiceStatus: "Proforma" };
      } else if (sell.invoiceStatuse === 3) {
        return { ...sell, InvoiceStatus: "Final" };
      }
      return "Error";
    }
  );

  const deleteSell = (id) => {
    sellservices.deleteSell(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "InvoiceNo",
      dataIndex: "invoiceNo",
      filters: [
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Proforma",
          value: "Proforma",
        },
        {
          text: "Final",
          value: "Final",
        },
      ],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
    },
    {
      title: "InvoiceStatuse",
      dataIndex: "InvoiceStatus",
      filters: [
        {
          text: "Draft",
          value: "Draft",
        },
        {
          text: "Proforma",
          value: "Proforma",
        },
        {
          text: "Final",
          value: "Final",
        },
      ],
      onFilter: (value, record) => record.InvoiceStatus.startsWith(value),
      filterSearch: true,
    },
    {
      title: "PayTerm",
      dataIndex: "payTerm",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.payterm - b.payterm,
    },
    {
      title: "Total",
      dataIndex: "total",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.total - b.total,
    },
    {
      title: "ShippingStatus",
      dataIndex: "ShippingStatus",
      filters: [
        {
          text: "Ordered",
          value: "Ordered",
        },
        {
          text: "Shipped",
          value: "Shipped",
        },
        {
          text: "Delivered",
          value: "Delivered",
        },
        {
          text: "Cancelled",
          value: "Cancelled",
        },
      ],
      onFilter: (value, record) => record.ShippingStatus.startsWith(value),
      filterSearch: true,
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
          <Link to='/sales/update'>
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
      {deleteState && <DeleteModal deleteItem={deleteSell} />}
      <SellHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={sellModifiedByInvoiceStatus}
      />
    </>
  );
}

export default SellList;
