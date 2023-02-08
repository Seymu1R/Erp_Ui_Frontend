import React, { useContext, useEffect, useRef, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import SellHeader from "./SellHeader";
import { sellservices } from "../APIs/Services/SellsServices";
import DeleteModal from "../UI/DeleteModal";
import { customerservice } from "../APIs/Services/CustomerServices";
import Loading from "../UI/Loading";

function SellList() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [sellList, setSellList] = useState([]);
  const [sellTotal, setSellTotal] = useState();
  const [customer, setCustomer] = useState(0);
  const tableRef = useRef(null);


  useEffect(() => {
    setLoading(false)
    sellservices.getAllSells().then(({ data: sells }) => {
      setSellList(sells.data);
    });
  }, [deleteState, loading, setLoading]);

  const sellModifiedByInvoiceStatus = sellList.map((sell) => {
    if (sell.invoiceStatuse === 1) {
      return { ...sell, InvoiceStatus: "Draft" };
    } else if (sell.invoiceStatuse === 2) {
      return { ...sell, InvoiceStatus: "Proforma" };
    } else if (sell.invoiceStatuse === 3) {
      return { ...sell, InvoiceStatus: "Final" };
    }
    return "Error";
  });

  const deleteSell = (id) => {
    sellservices.deleteSell(id).then((data) => {
      console.log(data.message);     
      customerservice.updateCustomer({
        id: `${customer.id}`,
        totalSale: customer.totalSale - sellTotal,
        businessName: `${customer.businessName}`,
        email: `${customer.email}`,
        taxNumber: `${customer.taxNumber}`,
        address: `${customer.address}`,
        phoneNumber: customer.phoneNumber,
      });
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);    
    sellservices.getSell(id).then(({ data: sell }) => {
      setSellTotal(sell.data.total);
      customerservice
        .getCustomer(sell.data.customerId)
        .then(({ data: customer }) => {
          setCustomer(customer.data);
        });
    });
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
          <Link to={`/sales/update/${record.id}`}>
            <Button id={record.id} variant="warning">
              Edit
            </Button>
          </Link>

          <Link to={`/productlist/view/${record.id}`}>
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
      {deleteState && <DeleteModal deleteItem={deleteSell} />}
      <SellHeader tableRef = {tableRef} />
      <Table
      ref={tableRef}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={sellModifiedByInvoiceStatus}
      />
    </>
  );
}

export default SellList;
