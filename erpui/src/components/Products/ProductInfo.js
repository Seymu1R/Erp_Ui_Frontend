import React, {useEffect, useState } from "react";
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
import { unitservices } from "../APIs/Services/UnitsServices";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import { brandservices } from "../APIs/Services/BrandsService";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { Link, useParams } from "react-router-dom";

function ProductInfoPage() {  
  const [productitem, setProduct] = useState({});
  const [unit, setunit] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [supplier, setSupplier] = useState("");
  let { productid } = useParams();

  let produceDate = new Date(productitem.produceDate);
  let expirationDate = new Date(productitem.expirationDate);

  const stocks = productitem.stockIds;
  useEffect(() => {
    productservices.getProduct(productid).then(({ data: product }) => {
      setProduct(product.data);
      unitservices.getUnit(product.data.unitId).then(({ data: unit }) => {
        setunit(unit.data.unitName);
        categoriesservices
          .getCategory(product.data.caregoryId)
          .then(({ data: category }) => {
            setCategory(category.data.name);
          });
        brandservices.getBrand(product.data.brandId).then(({ data: brand }) => {
          setBrand(brand.data.brandName);
        });
        supplierservices
          .getSupplier(product.data.suplierId)
          .then(({ data: supplier }) => {
            setSupplier(supplier.data.businessName);
          });
      });
    });
  }, [productid]);

  return (
    <Container>
      <Row>
        <Col xs="12" sm="4">
          <Card>
            <Image width={385} src="https://picsum.photos/300/200" />

            <CardBody CardBody style={{ fontSize: "25px", height: "244px" }}>
              <CardTitle>
                <h2>Name: {productitem.name} </h2>
              </CardTitle>
              <Link to={`/productlist/updateproduct/${productid}`}>
                {" "}
                <Button style={{ backgroundColor: "#002140" }} color="primary">
                  {" "}
                  Edit Product{" "}
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="8">
          <Card>
            <CardBody CardBody style={{ fontSize: "25px", height: "500px" }}>
              <Row>
                <Col xs="12" sm="6">
                  <CardText>SkuCode: {productitem.skuCode}</CardText>
                  <CardText>BarCode: {productitem.barCode}</CardText>
                  <CardText>
                    PurchasePrice: {productitem.purchasePrice}$
                  </CardText>
                  <CardText>SellingPrice: {productitem.sellingPrice}$</CardText>
                  <CardText>
                    AllertQuantity: {productitem.alertQuantityOrAmount}
                  </CardText>
                  <CardText>Weight: {productitem.weight}</CardText>
                  <CardText>
                    Stocks: {productitem.alertQuantityOrAmount}
                  </CardText>
                  <CardText>ProfitMargin: {productitem.profitMargin}</CardText>
                </Col>
                <Col xs="12" sm="6">
                  <CardText>
                    ProduceDate: {produceDate.toLocaleString("en-US")}
                  </CardText>
                  <CardText>
                    ExpirationDate: {expirationDate.toLocaleString("en-US")}
                  </CardText>
                  <CardText>Unit: {unit} </CardText>
                  <CardText>Category: {category} </CardText>
                  <CardText>Brand: {brand} </CardText>
                  <CardText>Supplier: {supplier}</CardText>
                  <CardText>Stocks: {stocks}</CardText>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductInfoPage;
