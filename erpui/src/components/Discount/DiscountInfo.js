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
} from "reactstrap";
import { productservices } from "../APIs/Services/ProductServices";
import { discountservices } from "../APIs/Services/DiscountsServices";
import { useParams } from "react-router-dom";

function DiscountInfo() {
  let { discountId } = useParams();
  const [discount, setDiscount] = useState({});
  const [productName, setproductNameList] = useState([]);


  useEffect(() => {
    discountservices.getDiscount(discountId).then(({ data: discount }) => {
      setDiscount(discount.data);
      let arr = [];
      discount.data.productIds.forEach((element) => {
        productservices.getProduct(element).then(({ data: product }) => {
          arr.push(product.data.name);
            setproductNameList(arr);          
        });
      });
    });
  }, [discountId]);

  console.log(productName);

  let startAt = new Date(discount.startsAt);

  let edsnAt = new Date(discount.endsTime);

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
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardBody CardBody style={{ fontSize: "25px", height: "641px" }}>
              <CardText>StartTime: {startAt.toLocaleString("en-US")}</CardText>
              <CardText>EndsTime: {edsnAt.toLocaleString("en-US")}</CardText>
              <CardText>DiscountAmount: {discount.discountPercent}%</CardText>
              <CardText>
                DiscountType: {discount.discountType ? "Fixed" : "Persentage"}
              </CardText>
              <CardText>Products: {productName.join(", ")}</CardText>              
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DiscountInfo;
