import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Input, Select, Form } from "antd";
import Button from "react-bootstrap/Button";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { stockservices } from "../APIs/Services/StockService";
import { purchaseservices } from "../APIs/Services/PurchaseServices";
import PurchaseCommerceAdd from "../PurchaseCommerce/PurchaseCommerceAdd";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import ProductCommerceListPruchase from "../PurchaseCommerce/ProductCommerceListPruchase";
import ErpContext from "../store/erp-context";

function UpdatePurchase() {
  let { purchaseId } = useParams();
  const [form] = useForm();
  const navigate = useNavigate()
  const [suppliers, setSuppliers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [{total}] = useContext(ErpContext)
  

  useEffect(() => {
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    });
    purchaseservices.getPurchase(purchaseId).then(({ data: purchase }) => {
      form.setFieldsValue({
        supplierId: purchase.data.supplierId,
        stockId: purchase.data.stockId,
        payTerm: purchase.data.payTerm,
        additionalNote: purchase.data.additionalNote,
      });
    });
  }, [purchaseId, form]);

 

  const optionsPurchase = suppliers.map((supplier) => {
    return (
      <Select.Option key={supplier.id} value={supplier.id}>
        {supplier.businessName}
      </Select.Option>
    );
  });
  const optionsStocks = stocks.map((stock) => {
    return (
      <Select.Option key={stock.id} value={stock.id}>
        {stock.buisnessLocation}
      </Select.Option>
    );
  });

 
  const updatePurchase = (body) => {
    purchaseservices
      .updatePurchase(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigate('/purchases'));
  };

 

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const postObj = {
            id: `${purchaseId}`,
            supplierId: `${values.supplierId}`,
            stockId: `${values.stockId}`,
            payTerm: `${values.payTerm}`,
            additionalNote: `${values.additionalNote}`,
            total : `${total}`
          };
          updatePurchase(postObj);
         
        }}
      >
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              hasFeedback
              name="supplierId"
              label="Suppliers"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Suppliers"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsPurchase}
              </Select>
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
              name="stockId"
              label="Stock"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Stock"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsStocks}
              </Select>
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
              name="payTerm"
              label="PayTerm"
            >
              <Input
                type="number"
                id="payTerm"
                size="large"
                placeholder="PayTerm"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row style={{ marginBottom: "20px" }}>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your Description",
                  whitespace: true,
                  min: 3,
                  max: 20,
                },
              ]}
              hasFeedback
              name="additionalNote"
              label="AdditionalNote"
            >
              <Input
                type="text"
                id="additionalNote"
                size="large"
                placeholder="AdditionalNote"
                style={{ width: "90%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="submit" variant="warning">Edit</Button>
      </Form>
      <PurchaseCommerceAdd purchaseId={purchaseId} />
      <ProductCommerceListPruchase  purchaseId={purchaseId} />
    </>
  );
}

export default UpdatePurchase;
