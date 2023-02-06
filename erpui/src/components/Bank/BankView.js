import "./BankView.scss"
import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import ErpContext from "../store/erp-context";
import { banktransactionservices } from "../APIs/Services/BankTransactionsservices";
import { bankservices } from "../APIs/Services/BankServices";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { customerservice } from "../APIs/Services/CustomerServices";
import { DownloadTableExcel } from "react-export-table-to-excel";
import DeleteModal from "../UI/DeleteModal";


function BankView() {
  const tableRef = useRef(null);
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
  useContext(ErpContext);
    const { bankId } = useParams();
  const [bank, setBank] = useState({});
  const [banktransactions, setBankTransactionlist] = useState([]);
  const [bankTransaction, setBankTransaction ] = useState()
  const [suppliers, setSupplies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [{auth}] = useContext(ErpContext)
  const config = { headers: { Authorization: `Bearer ${auth.AccesToken}` } };

  useEffect(() => {   
    banktransactionservices
      .getAllBankTransactions(config)
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

    bankservices.getBank(bankId, config).then(({ data: bank }) => {
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

  const deleteBankTransaction = (id) => {
    banktransactionservices.getBankTransaction(id, config).then(({data : bt}) => {
      if(bt.data.suplierId){
        bankservices.updateBank({...bank,bankBalance :bank.bankBalance + bt.data.paymentAmount}, config).then(({data:bank})=>{
          console.log(bank.data);
        })
        supplierservices.getSupplier(bt.data.suplierId).then(({data:supplier}) => {
          supplierservices.updateSupplier({...supplier.data, totalPurchase: + (supplier.data.totalPurchase + bt.data.paymentAmount)}).then((data)=>{
            console.log(data);
          })
        })
      }
      if(bt.data.customerId){
        bankservices.updateBank({...bank,bankBalance : bank.bankBalance - bt.data.paymentAmount}, config).then(({data:bank})=>{
          console.log(bank.data);
        })
        customerservice.getCustomer(bt.data.customerId).then(({data:customer}) => {
          customerservice.updateCustomer({...customer.data,totalSale:customer.data.totalSale + bt.data.paymentAmount})
        })
      }
      banktransactionservices.deleteBankTransaction(id, config).then((response)=>{
        setLoading(true)
      })
    })    
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
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
        </div>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col md={6}>
          <p className="bank" >BankName: <span>{bank.bankName}</span></p>
        </Col>
        <Col md={6}>
          <p className="bank" >BankBalance: <span>{bank.bankBalance}</span></p>
        </Col>
        <Col md={6}>
            <Link to={`/addbanktransaction/${bankId}`}>
            <button style={{background:"#2c86dd", color:"white"}} > Add BankTransaction </button>
            </Link>          
        </Col>
        <Col md={6}>
        <DownloadTableExcel
        filename="bank transaction table"
        sheet="tables"
        currentTableRef={tableRef.current}
      >
        <button style={{background:"#2c86dd", color:"white"}} > Export excel </button>
      </DownloadTableExcel>       
        </Col>
      </Row>
      <div>
        {loading && <Loading />}
        {deleteState && <DeleteModal deleteItem={deleteBankTransaction} />}        
        <Table ref={tableRef} columns={columns} dataSource={bankTransactions} />
      </div>
    </>
  );
}

export default BankView;
