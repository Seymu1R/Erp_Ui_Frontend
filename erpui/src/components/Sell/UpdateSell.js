import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Input, Select, Form } from "antd";
import Button from "react-bootstrap/esm/Button";
import { stockservices } from "../APIs/Services/StockService";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { customerservice } from "../APIs/Services/CustomerServices";
import { sellservices } from "../APIs/Services/SellsServices";
import ProductCommerceList from "../UI/ProductCommerceList";
import SellCommerceAdd from "../PurchaseCommerce/SellCommerceAdd";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import ErpContext from "../store/erp-context";

function UpdateSell() {
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  let { sellId } = useParams();
  const [{ total }] = useContext(ErpContext);
  const [customerItem, setCustomerItem] = useState({})
  const [customerTotal, setCustomerTotal] = useState(0);
  const [stockId , setStockId ] = useState();
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    });
    discountservices.getAllDiscounts().then(({ data: discounts }) => {
      setDiscounts(discounts.data);
    });
    sellservices.getSell(sellId).then(({ data: sell }) => {
     setStockId(sell.data.stockId);
      form.setFieldsValue({
        payTerm: sell.data.payTerm,
        invoiceStatuse: sell.data.invoiceStatuse,
        shippingAddress: sell.data.shippingAddress,
        sellNote: sell.data.sellNote,
        customerId: sell.data.customerId,
        stockId: sell.data.stockId,
        shippingStatus: sell.data.shippingStatus,
        discountIds: sell.data.discountIds,
      });
      customerservice
      .getCustomer(sell.data.customerId)
      .then(({ data: customer }) => {
        setCustomerItem(customer.data)
        setCustomerTotal(customer.data.totalSale + total);
        
      });
    });
  }, [form, sellId ,total]);

  const optionsCategory = customers.map((customer) => {
    return (
      <Select.Option key={customer.id} value={customer.id}>
        {customer.buisnessName}
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
  const discountOptions = discounts.map((discount) => {
    return (
      <Select.Option key={discount.id} value={discount.id}>
        {discount.name}
      </Select.Option>
    );
  });

  const editSell = (body) => {
    sellservices
      .updateSell(body)
      .then((res) => {
        customerservice
        .updateCustomer({
          id: `${customerItem.id}`,
          totalSale: customerTotal,
          businessName: `${customerItem.businessName}`,
          email: `${customerItem.email}`,
          taxNumber: `${customerItem.taxNumber}`,
          address: `${customerItem.address}`,
          phoneNumber: customerItem.phoneNumber
        })
        .then((data) => {
          console.log(data);
        });
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      }).finally(navigate('./sales'));
  };

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const postObj = {
            id: `${sellId}`,
            customerId: `${values.customerId}`,
            stockId: `${values.stockId}`,
            shippingAddress: `${values.shippingAddress}`,
            payTerm: `${values.payTerm}`,
            sellNote: `${values.sellNote}`,
            discountIds: values.discountIds,
            total: `${total}`,
            invoiceStatuse: values.invoiceStatuse
          };
          editSell(postObj);
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
              name="customerId"
              label="Customers"
            >
              <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Search Customer"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {optionsCategory}
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
              name="sellNote"
              label="SellNote"
            >
              <Input
                type="text"
                id="sellNote"
                size="large"
                placeholder="SellNote"
                style={{ width: "90%" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter your SellNote",
                  whitespace: true,
                  min: 3,
                  max: 20,
                },
              ]}
              hasFeedback
              name="shippingAddress"
              label="ShippingAddress"
            >
              <Input
                type="text"
                id="shippingAddress"
                size="large"
                placeholder="ShippingAddress"
                style={{ width: "90%" }}
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
              name="discountIds"
              label="Discounts"
            >
              <Select
                showSearch
                mode="multiple"
                style={{ width: 200 }}
                placeholder="Search Discount"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {discountOptions}
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
              name="invoiceStatuse"
              label="InvoiceStatus"
            >
              <Select                             
                style={{ width: 200 }}
                placeholder="invoiceStatus"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Select.Option key={1} value={1}>
                  Draft
                </Select.Option>
                <Select.Option key={2} value={2}>
                Proforma
                </Select.Option>
                <Select.Option key={3} value={3}>
                Final
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="submit" variant="warning">
          Edit
        </Button>
      </Form>
      <SellCommerceAdd stockId = {stockId} sellId={sellId} />
      <ProductCommerceList sellId={sellId} />
    </>
  );
}

export default UpdateSell;
