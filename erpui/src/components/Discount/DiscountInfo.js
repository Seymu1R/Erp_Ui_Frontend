import React, { useEffect, useState } from "react";
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
import { productservices } from "../APIs/Services/ProductServices";
import { Link } from "react-router-dom";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { useParams } from "react-router-dom";

function DiscountInfo() {
  let { discountId } = useParams();
  const [discount, setDiscount] = useState({});
  const [productList, setproductList] = useState([]);
  const [selllist, setSelllist] = useState([]);

  const products = [];

  useEffect(() => {
    discountservices.getDiscount(discountId).then(({ data: discount }) => {
      setDiscount(discount.data);
      setproductList(discount.data.productIds);
      setSelllist(discount.data.sellIds);
    });
  }, [discountId]);

  for (let index = 0; index < productList.length; index++) {
    const element = productList[index];
    productservices.getProduct(element).then(({ data: product }) => {
      products.push(element.name);
    });
  }

  return (
    <Container>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <Image width={595} src="https://picsum.photos/300/200" />
            <CardBody CardBody style={{ fontSize: "10px", height: "244px" }}>
              <CardTitle>
                <h2>Name: {discount.name} </h2>
              </CardTitle>
              <Link to={`/discount/update/${discountId}`}>
                <Button style={{ backgroundColor: "#002140", marginTop:"100px" }} color="primary">Edit Discount</Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
          <CardBody CardBody style={{ fontSize: "25px", height: "641px" }}>
              <CardText>StartTime: {discount.startsAt}</CardText>
              <CardText>EndsTime: {discount.endsTime}</CardText>
              <CardText>DiscountAmount: {discount.discountAmount}$</CardText>
              <CardText>
                DiscountType: {discount.discountType ? "Fixed" : "Persentage"}
              </CardText>
              <CardText>Products: {products}</CardText>
              <CardText>Sells: </CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DiscountInfo;
