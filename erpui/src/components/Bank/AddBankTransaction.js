import React, { useEffect, useState } from "react";
import { Col, Row, Input, Button, Select, Form } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { customerservice } from "../APIs/Services/CustomerServices";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { banktransactionservices } from "../APIs/Services/BankTransactionsservices";

function AddBankTransaction() {
  const [showCustomer, setShowCustomer] = useState(true);
  const [showSupplier, setShowSupplier] = useState(false); 
  const [customerList, setCustomers] = useState([]);
  const [supplierList, setSuppliers] = useState([]);
  const navigation = useNavigate();
  const {bankId} = useParams()

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
  }, []);

  const optionCustomers = customerList.map((customer) => {
    return { value: customer.id, label: customer.businessName };
  });

  const optionSuppliers = supplierList.map((supplier) => {
    return { value: supplier.id, label: supplier.businessName };
  });

  const addBankTransaction = (body) => {
    banktransactionservices
      .createBankTransaction(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      })
      .finally(navigation("/categories"));
  };

  return (
    <Form
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postSuppliertransaction= {
            customerId: `${values.customerId}`,
            bankId: bankId,
            paymentAmount: `${values.paymentAmount}`
        };
        const postCustomertransaction = {
            suplierId: `${values.suplierId}`,
            bankId: bankId,
            paymentAmount: `${values.paymentAmount}`
        };
        addBankTransaction(showCustomer ? postCustomertransaction : postSuppliertransaction);
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
