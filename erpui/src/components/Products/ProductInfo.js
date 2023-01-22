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
import { unitservices } from "../APIs/Services/UnitsServices";
import { categoriesservices } from "../APIs/Services/CategoryServices";
import { brandservices } from "../APIs/Services/BrandsService";
import { supplierservices } from "../APIs/Services/SupplierServices";
import { Link } from "react-router-dom";

function ProductInfoPage() {
  const [{ id, setId }] = useContext(ErpContext);
  const [product, setProduct] = useState({});
  const [unit, setunit] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [supplier, setSupplier] = useState("");

  const stocks = product.stockIds;
  useState(() => {
    productservices.getProduct(id).then(({ data: product }) => {
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
          .getSupplier(product.data.suppliersID)
          .then(({ data: supplier }) => {
            setSupplier(supplier.data.suppliersID);
          });
      });
    });
  }, []);
  console.log(stocks);
  return (
    <Container>
      <Row>
        <Col xs="12" sm="4">
          <Card>
            <Image width={350} src="https://picsum.photos/300/200" />

            <CardBody>
              <CardTitle>
                <h2>Name: {product.name} </h2>
              </CardTitle>
              <Link to="/productlist/updateproduct">
                {" "}
                <Button
                  onClick={() => {
                    setId(product.id);
                  }}
                  color="primary"
                >
                  {" "}
                  Edit Product{" "}
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="4">
          <Card>
            <CardBody>
              <CardText>SkuCode: {product.skuCode}</CardText>
              <CardText>BarCode: {product.barCode}</CardText>
              <CardText>PurchasePrice: {product.purchasePrice}$</CardText>
              <CardText>SellingPrice: {product.sellingPrice}$</CardText>
              <CardText>
                AllertQuantity: {product.alertQuantityOrAmount}
              </CardText>
              <CardText>Weight: {product.weight}</CardText>
              <CardText>Stocks: {product.alertQuantityOrAmount}</CardText>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="4">
          <Card>
            <CardBody>
              <CardText>ProfitMargin: {product.profitMargin}</CardText>
              <CardText>ProduceDate: {product.produceDate}</CardText>
              <CardText>ExpirationDate: {product.expirationDate}</CardText>
              <CardText>Unit: {unit} </CardText>
              <CardText>Category: {category} </CardText>
              <CardText>Brand: {brand} </CardText>
              <CardText>Supplier: {supplier}</CardText>
              <CardText>Stocks: {stocks}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductInfoPage;
