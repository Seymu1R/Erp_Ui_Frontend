import React, { useState, useEffect, useContext } from "react";
import ErpContext from "../store/erp-context";
import { Col, Row, Input, Select, Tooltip, Table, Form } from "antd";
import { Option } from "antd/es/mentions";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import DeleteModal from "../UI/DeleteModal";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import { stockservices } from "../APIs/Services/StockService";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { customerservice } from "../APIs/Services/CustomerServices";

function AddSell() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [customers, setCustomers] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };
  const deleteProductCommerce = (id) => {
    productcommerceservices.deleteProductCommerce(id).then((data) => {
      console.log(data.message);
    });
  };

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStocks(stocks.data);
    });
    discountservices.getAllDiscounts().then(({data: discounts}) => {
      setDiscounts(discounts.data)
    })
  }, []);

  const optionsCategory = customers.map((category) => {
    return <Option value={category.id}>{category.name}</Option>;
  });
  const optionsStocks = stocks.map((stock) => {
    return <Option value={stock.id}>{stock.buisnessLocation}</Option>;
  });
  const discountOptions = discounts.map((discount) => {
    return <Option value={discount.id}>{discount.name}</Option>;
  })
  const columns = [
    {
      title: "ProductName",
      dataIndex: "productname",
    },
    {
      title: "ProductAmount",
      dataIndex: "productAmount",
    },
    {
      title: "SubTotal",
      dataIndex: "subtotal",
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

          <Link to="/productlist/view">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="info"
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      customercode: "xxx",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      customercode: "ppp",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      customercode: "yyy",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      customercode: "xyz",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];

  return (
    <Form>
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
          <label style={{ width: "100%" }}>ProductCommerce</label>
          <Link to="/addpurchasecommerce">
            <Tooltip title="Add PurchaseCommerce" color={"#2b80ec"}>
              <AppstoreAddOutlined
                style={{
                  fontSize: "30px",
                  color: "#2b80ec",
                  cursor: "pointer",
                  marginLeft: "20px",
                }}
              />
            </Tooltip>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
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
              style={{ width: 200 }}
              placeholder="Search Discount"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {discountOptions}
            </Select>
            </Form.Item>
        </Col>
      </Row>
      {deleteState && <DeleteModal deleteItem={deleteProductCommerce} />}
      <Table rowKey={(record) => record.id} columns={columns} dataSource={data} />
      <Button variant="primary">Add</Button>
    </Form>
  );
}

export default AddSell;
