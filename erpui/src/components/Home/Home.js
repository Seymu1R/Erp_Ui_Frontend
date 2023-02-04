import React, { useEffect, useState } from "react";
import { Col, Row } from "antd";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GetAppIcon from "@mui/icons-material/GetApp";
import MoneyIcon from "@mui/icons-material/Money";
import { customerservice } from "../APIs/Services/CustomerServices";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { productservices } from "../APIs/Services/ProductServices";

function Home() {
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    customerservice.getAllCustomers().then(({ data: customers }) => {
      setCustomers(customers.data);
    });
    supplierservices.getAllSuppliers().then(({ data: suppliers }) => {
      setSuppliers(suppliers.data);
    });
    productservices.getAllpRoducts().then(({data:products}) => {
      setProducts(products.data);
    })
  }, []);

  let totalSales = 0;
  let totalPurchases = 0;
  let purchasePriceTotal = 0;
  let sellingPricetotal = 0;
  customers.forEach((element) => {
    totalSales += element.totalSale;
  });
 
  suppliers.forEach((element) => {
    totalPurchases += element.totalPurchase
  });

  products.forEach((element) => {
    purchasePriceTotal += element.purchasePrice
    sellingPricetotal += element.sellingPrice
  })
  return (
    <Row>
      <Col md={8}>
        <Row>
          <Col md={5} style={{ borderRadius: "100%", background: "#046fdb" }}>
            {" "}
            <AddShoppingCartIcon
              style={{ fontSize: "87px", color: "#fff", padding: "10px" }}
            />
          </Col>
          <Col md={16}>
            <h3 style={{ width: "100%", textAlign: "center" }}>TOTAL SALES</h3>
            <h3
              style={{ width: "100%", textAlign: "center", fontSize: "20px" }}
            >
              $ {totalSales}
            </h3>
          </Col>
        </Row>
      </Col>
      <Col md={8}>
        <Row>
          <Col md={5} style={{ borderRadius: "100%", background: "#046fdb" }}>
            {" "}
            <GetAppIcon
              style={{ fontSize: "87px", color: "#fff", padding: "10px" }}
            />
          </Col>
          <Col md={16}>
            <h3 style={{ width: "100%", textAlign: "center" }}>
              TOTAL PURCHASE
            </h3>
            <h3
              style={{ width: "100%", textAlign: "center", fontSize: "20px" }}
            >
              $ {totalPurchases}
            </h3>
          </Col>
        </Row>
      </Col>
      <Col md={8}>
        <Row>
          <Col md={5} style={{ borderRadius: "100%", background: "#046fdb" }}>
            {" "}
            <MoneyIcon
              style={{ fontSize: "87px", color: "#fff", padding: "10px" }}
            />
          </Col>
          <Col md={16}>
            <h3 style={{ width: "100%", textAlign: "center" }}>
              PROFIT MARGIN
            </h3>
            <h3
              style={{ width: "100%", textAlign: "center", fontSize: "20px" }}
            >
              % { Math.round((purchasePriceTotal/sellingPricetotal)*100)}
            </h3>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Home;
