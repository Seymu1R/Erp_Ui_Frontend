import React, {useContext, useState, useEffect} from 'react'
import ErpContext from '../store/erp-context';
import { Col, Row, Input, Select, Form} from "antd";
import Button from "react-bootstrap/Button";
import ProductCommerceList from '../UI/ProductCommerceList';
import { supplierservices } from '../APIs/Services/SupplierServices';
import { stockservices } from '../APIs/Services/StockService';
import { purchaseservices } from '../APIs/Services/PurchaseServices';
import PurchaseCommerceAdd from '../PurchaseCommerce/PurchaseCommerceAdd';

function UpdatePurchase() {
  const [{ id}] = useContext(ErpContext);
  const [purchases, setPurchases] = useState([]);
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setPurchases(suppliers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    }); 
  }, []);

  const optionsPurchase = purchases.map((purchase) => {
    return (
      <Select.Option key={purchase.id} value={purchase.id}>
        {purchase.name}
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

  const addSell = (body) => {
    purchaseservices
      .createPurchase(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      });
  };

  return (
    <>
      <Form
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const postObj = {
            supplierId: `${values.supplierId}`,
            stockId: `${values.stockId}`,           
            payTerm: `${values.payTerm}`,
            additionalNote: `${values.additionalNote}`,          
          };
          addSell(postObj);
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
        <Button variant="warning">Edit</Button>
      </Form>
      <PurchaseCommerceAdd  purchaseId = {id} />
      <ProductCommerceList sellId = {id}  />
    </>
  );
}

export default UpdatePurchase