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
import { Link, useParams } from "react-router-dom";
import { stockservices } from "../APIs/Services/StockService";
import { sellservices } from "../APIs/Services/SellsServices";
import { customerservice } from "../APIs/Services/CustomerServices";
import { discountservices } from "../APIs/Services/DiscountsServices";

function SellView() {
    let { sellId } = useParams();
    const [sell, setSell] = useState({});
    const [customer, setCustomer] = useState("");
    const [stock, setStock] = useState("");
    const [discountName, setDiscountName] = useState([]);
  
    useEffect(() => {
      sellservices.getSell(sellId).then(({ data: sell }) => {
        let arr = []
        sell.data.discountIds.forEach(element => {            
            discountservices.getDiscount(element).then(({data: discount}) => {
                arr.push(discount.data.name)
                setDiscountName(arr)
            })
        });
        setSell(sell.data);
        console.log(sell.data.supplierId);
        customerservice
          .getCustomer (sell.data.customerId)
          .then(({ data: customer }) => {
            setCustomer(customer.data.businessName);
          });
        stockservices.getStock(sell.data.stockId).then(({ data: stock }) => {
          setStock(stock.data.buisnessLocation);
        });
      });
    }, [sellId]);
    console.log(discountName);
  return (
    <Container>
    <Row>
      <Col xs="12" sm="4">
        <Card>
          <Image width={399} src="https://picsum.photos/300/200" />

          <CardBody CardBody style={{ fontSize: "10px", height: "244px" }}>
            <CardTitle>
              <h2>InvoiceNumber: {sell.invoiceNo}</h2>
            </CardTitle>
            <Link to={`/sales/update/${sellId}`}>
              <Button style={{ backgroundColor: "#002140", marginTop:"40px" }} color="primary">
                Edit Sell
              </Button>
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col xs="12" sm="8">
        <Card>
          <CardBody CardBody style={{ fontSize: "25px", height: "500px" }}>
            <CardText>PayTerm: {sell.payTerm} Day</CardText>
            <CardText>InvoiceStatuse: {sell.invoiceStatuse === 1 ? "Draft": "Proforma"}</CardText>
            <CardText>Customer: {customer}</CardText>
            <CardText>ShippingAddress: {sell.shippingAddress}</CardText>
            <CardText>SellNote: {sell.sellNote}</CardText>
            <CardText>Stock: {stock}</CardText>
            <CardText>Total: {sell.total}</CardText>
            <CardText>Discounts: {discountName.join(", ")}</CardText>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}

export default SellView