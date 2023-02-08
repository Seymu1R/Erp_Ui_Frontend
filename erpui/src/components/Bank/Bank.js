import React, { useEffect, useContext, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import DeleteModal from "../UI/DeleteModal";
import Loading from "../UI/Loading";
import { bankservices } from "../APIs/Services/BankServices";
import BankHeader from "./BankHeader";
import { authservices } from "../APIs/Services/AuthService";

function Bank() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [bankList, setBanklist] = useState([]);
  const [{ auth, setAuth }] = useContext(ErpContext);
  const config = { headers: { Authorization: `Bearer ${auth.AccesToken}` } };

  useEffect(() => {
    bankservices
      .getAllBanks(config)
      .then(({ data: banks }) => {
        setBanklist(banks.data);
      })
      .finally(setLoading(false));    
      
     }, [loading, setLoading]);

  const deleteBrand = (id) => {
    bankservices.deleteBank(id, config).then((data) => {
      setLoading(true);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Bank",
      dataIndex: "bankName",
      filters: bankList.map((bank) => {
        return { text: bank.bankName, value: bank.bankBalance };
      }),
      filterSearch: true,
      onFilter: (value, record) => record.brandName.startsWith(value),
      width: "25%",
    },
    {
      title: "BankBalance",
      dataIndex: "bankBalance",
      width: "25%",
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
          <Link to={`/banks/update/${record.id}`}>
            <Button id={record.id} variant="primary">
              Edit
            </Button>
          </Link>
          <Link to={`/banks/view/${record.id}`}>
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
      {deleteState && <DeleteModal deleteItem={deleteBrand} />}
      <BankHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={bankList}
      />
    </>
  );
}

export default Bank;
