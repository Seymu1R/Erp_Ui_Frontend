import React, { useContext, useState } from "react";
import ErpContext from "../store/erp-context";
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

function DiscountInfo() {
  const [{ id, setId }] = useContext(ErpContext);
  const [discount, setDiscount] = useState({}); 

 const products = [];
  useState(() => {
    discountservices.getDiscount(id).then(({ data: discount }) => {
      setDiscount(discount.data);
      discount.data.productIds.forEach((element) => {
        productservices.getProduct(element).then(({data:product}) => {
            products.push(product.data.name);
        })       
      });
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col xs="12" sm="6">
          <Card>
            <Image width={350} src="https://picsum.photos/300/200" />
            <CardBody>
              <CardTitle>
                <h2>Name: {discount.name} </h2>
              </CardTitle>
              <Link to="/discount/update">             
                <Button
                  onClick={() => {
                    setId(discount.id);
                  }}
                  color="primary"
                >                  
                  Edit Discount
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6">
          <Card>
            <CardBody>
              <CardText>StartTime: {discount.startsAt}</CardText>
              <CardText>EndsTime: {discount.endsTime}</CardText>
              <CardText>DiscountAmount: {discount.discountAmount}$</CardText>
              <CardText>DiscountType: {discount.discountType?"Fixed":"Persentage"}</CardText>
              <CardText>
                Products: 
              </CardText>
              <CardText>Sells: </CardText>             
            </CardBody>
          </Card>
        </Col>
       
      </Row>
    </Container>
  );
}

export default DiscountInfo;
