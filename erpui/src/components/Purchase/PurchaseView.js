import React, { useState, useEffect } from "react";
import { Image } from "antd";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { Link, useParams } from "react-router-dom";
import { purchaseservices } from "../APIs/Services/PurchaseServices";
import { stockservices } from "../APIs/Services/StockService";

function PurchaseView() {
  let { purchaseId } = useParams();
  const [purchase, setPurchase] = useState({});
  const [supplier, setSupplier] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    purchaseservices.getPurchase(purchaseId).then(({ data: purchase }) => {
      setPurchase(purchase.data);
      console.log(purchase.data.supplierId);
      supplierservices
        .getSupplier(purchase.data.supplierId)
        .then(({ data: supplier }) => {
          setSupplier(supplier.data.businessName);
        });
      stockservices.getStock(purchase.data.stockId).then(({ data: stock }) => {
        setStock(stock.data.buisnessLocation);
      });
    });
  }, [purchaseId]);

  return (
    <Container>
      <Row>
        <Col xs="12" sm="4">
          <Card>
            <Image width={399} src="https://picsum.photos/300/200" />

            <CardBody CardBody style={{ fontSize: "10px", height: "244px" }}>
              <CardTitle>
                <h2>PurchaseCode: {purchase.purchaseCode}</h2>
              </CardTitle>
              <Link to={`/purchase/update/${purchaseId}`}>
                <Button style={{ backgroundColor: "#002140", marginTop:"40px" }} color="primary">
                  Edit Purchase
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="8">
          <Card>
            <CardBody CardBody style={{ fontSize: "25px", height: "500px" }}>
              <CardText>PayTerm: {purchase.payTerm} Day</CardText>
              <CardText>PurchaseStatus: {purchase.purchaseStatus === 1 ? "Pending" : "Ordered"}</CardText>
              <CardText>Supplier: {supplier}</CardText>
              <CardText>Stock: {stock}</CardText>
              <CardText>Total: {purchase.total}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PurchaseView;
