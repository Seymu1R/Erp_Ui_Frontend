import React, { useContext, useEffect, useState } from "react";
import { Col, Row, Input, Button, Select, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { customerservice } from "../APIs/Services/CustomerServices";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { banktransactionservices } from "../APIs/Services/BankTransactionsservices";
import { bankservices } from "../APIs/Services/BankServices";
import ErpContext from "../store/erp-context";

function AddBankTransaction() {
  const [showCustomer, setShowCustomer] = useState(true);
  const [showSupplier, setShowSupplier] = useState(false); 
  const [customerList, setCustomers] = useState([]);
  const [supplierList, setSuppliers] = useState([]);
  const [ bank, setBank] = useState({})
  const navigation = useNavigate();
  const {bankId} = useParams()
  const [{auth}] = useContext(ErpContext)
  const config = { headers: { Authorization: `Bearer ${auth.AccesToken}` } };

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
    bankservices.getBank(bankId, config).then(({data:bank}) => {
      setBank(bank.data)
    })
  }, [bankId]);

  const optionCustomers = customerList.map((customer) => {
    return { value: customer.id, label: customer.businessName };
  });

  const optionSuppliers = supplierList.map((supplier) => {
    return { value: supplier.id, label: supplier.businessName };
  });

  const addBankTransaction = (body) => {
    banktransactionservices
      .createBankTransaction(body, config)
      .then((response) => {
        if(body.suplierId){
          bankservices.updateBank({...bank,bankBalance :bank.bankBalance - body.paymentAmount}, config).then(({data:bank})=>{
            console.log(bank.data);
          })
          supplierservices.getSupplier(body.suplierId).then(({data:supplier}) => {
            supplierservices.updateSupplier({...supplier.data, totalPurchase: +(supplier.data.totalPurchase - body.paymentAmount)}).then((data)=>{
              console.log(data);
            })
          })
        }
        if(body.customerId){
          bankservices.updateBank({...bank,bankBalance : bank.bankBalance + eval(body.paymentAmount)}, config).then(({data:bank})=>{
            console.log(bank.data);
          })
          customerservice.getCustomer(body.customerId).then(({data:customer}) => {
            customerservice.updateCustomer({...customer.data,totalSale:customer.data.totalSale - body.paymentAmount})
          })
        }
        
        
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigation(`/banks/view/${bankId}` ))
     
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postCustomertransaction= {
            customerId: `${values.customerId}`,
            bankId: bankId,
            paymentAmount: values.paymentAmount
        };
        const postSuppliertransaction = {
            suplierId: `${values.suplierId}`,
            bankId: bankId,
            paymentAmount: values.paymentAmount
        };
        addBankTransaction(showCustomer ? postSuppliertransaction : postCustomertransaction);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item>
            <Select
              defaultValue={"Supplier"}
              onChange={(value) => {
                if (value === "Customer") {
                  setShowCustomer(false);
                  setShowSupplier(true);
                }
                if (value === "Supplier") {
                  setShowSupplier(false);
                  setShowCustomer(true);
                }
              }}
              style={{
                width: "89%",
                marginLeft: "20px",
              }}
            >
              <Select.Option key={1} value="Supplier">
                Supplier
              </Select.Option>
              <Select.Option key={2} value="Customer">
                Customer
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="customerId" label="Customer">
            <Select
              disabled={showCustomer && true}
             
              size="large"
              style={{
                marginLeft: "20px",
                width: "80%",
              }}
              options={optionCustomers}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="suplierId" label="Supplier">
            <Select

              disabled={showSupplier && true}
              style={{
                width: "80%",
                marginLeft: "20px",
              }}
              options={optionSuppliers}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="paymentAmount"
            label="PaymentAmount"
          >
            <Input
              style={{ width: "90%" }}
              type="number"
              id="paymentAmount"
              size="large"
              placeholder="PaymentAmount"
            />
          </Form.Item>
        </Col>
      </Row>

      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
    </Form>
  );
}

export default AddBankTransaction;
