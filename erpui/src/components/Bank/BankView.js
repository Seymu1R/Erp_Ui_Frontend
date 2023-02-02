import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Table, Button } from "antd";
import { Link, useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import ErpContext from "../store/erp-context";
import { banktransactionservices } from "../APIs/Services/BankTransactionsservices";
import { bankservices } from "../APIs/Services/BankServices";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { customerservice } from "../APIs/Services/CustomerServices";

function BankView() {
  const [{ loading, setLoading }] = useContext(ErpContext);
  const { bankId } = useParams();
  const [bank, setBank] = useState({});
  const [banktransactions, setBankTransactionlist] = useState([]);
  const [suppliers, setSupplies] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    banktransactionservices
      .getAllBankTransactions()
      .then(({ data: banktransactions }) => {
        setBankTransactionlist(banktransactions.data);
      })
      .finally(setLoading(false));

    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSupplies(suppliers.data);
    });
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });

    bankservices.getBank(bankId).then(({ data: bank }) => {
      setBank(bank.data);
    });
  }, [bankId, loading, setLoading]);

  const filteredBankTransaction = banktransactions.filter(
    (bt) => bt.bankId === bankId
  );

  const bankTransactions = filteredBankTransaction.map((item) => {
    if (item.customerId !== null) {
      return { ...item, paymentAmount: item.paymentAmount };
    }
    if (item.suplierId !== null) {
      return { ...item, paymentAmount: -item.paymentAmount };
    }
  });

  const returnTime = (date) => {
    return new Date(date);
  };

  const getSupplier = (id) => {
    const supplierFind = suppliers.find((sp) => sp.id === id);
    if(supplierFind){return supplierFind.businessName.toString()}    
  };
  const getCustomer = (id) => {
    const customerFind = customers.find((sp) => sp.id === id);
    if (customerFind) {
      return customerFind.businessName.toString();
    }
  };

  const columns = [
    {
      title: "CreatedTime",
      dataIndex: "updatedTime",
      render: (updatedTime) => returnTime(updatedTime).toLocaleString("en-US"),
    },
    {
      title: "Customer",
      dataIndex: "customerId",
      render: (customerId) => getCustomer(customerId),
    },
    {
      title: "Supplier",
      dataIndex: "suplierId",
      render: (suplierId) => getSupplier(suplierId),
    },

    {
      title: "PaymentAmount",
      dataIndex: "paymentAmount",
      render: (paymentAmount) => paymentAmount + "  USD",
    },
  ];
  return (
    <>
      <Row>
        <Col md={8}>
          <p>BankName: {bank.bankName}</p>
        </Col>
        <Col md={8}>
          <p>BankBalance: {bank.bankBalance}</p>
        </Col>
        <Col md={8}>
            <Link to={`/addbanktransaction/${bankId}`}>
            <Button htmlType={"submit"} type="primary" > Add BankTransaction </Button>
            </Link>          
        </Col>
      </Row>
      <div>
        {loading && <Loading />}        
        <Table columns={columns} dataSource={bankTransactions} />
      </div>
    </>
  );
}

export default BankView;
