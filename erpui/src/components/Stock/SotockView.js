import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Table } from "antd";
import { useParams } from "react-router-dom";
import { stockservices } from "../APIs/Services/StockService";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import Loading from "../UI/Loading";
import ErpContext from "../store/erp-context";
import { productservices } from "../APIs/Services/ProductServices";

function SotockView() {
  const [{ loading, setTotal, setLoading }] = useContext(ErpContext);
  const { stockId } = useParams();
  const [stock, setStock] = useState({});
  const [productCommercelist, setProductCommerceList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProductList(products.data);
      productcommerceservices
        .getAllProductCommerce()
        .then(({ data: productcommerce }) => {
          setProductCommerceList(productcommerce.data);
        })
        .finally(setLoading(false));
    });

    stockservices.getStock(stockId).then(({ data: stock }) => {
      setStock(stock.data);
    });
  }, [stockId, loading, setLoading]);

  const b = productCommercelist.map((item) => {
    if (item.sellId !== null) {
      return { ...item, productAmount: -item.productAmount };
    }
    if (item.purchaseId !== null) {
      return { ...item, productAmount: item.productAmount };
    }
  }); 

const endresult = Object.values(b.reduce((value, object) => {
  if (value[object.productId]) {
    value[object.productId].productAmount += object.productAmount; 
    value[object.productId].count++;

} else {
    value[object.productId] = { ...object , count : 1
    };
  }
  return value;
}, {}));

console.log(endresult)

const arr = endresult.map((item) => {
    for (let j = 0; j < productList.length; j++) {
      if (item.productId === productList[j].id) {
        return {
          id: item.id,
          prductAmount: item.productAmount,
          ProductName: productList[j].name,
          PurchasePrice: productList[j].purchasePrice,
          SubTotal: +(productList[j].purchasePrice * item.productAmount),
        };
      }
    }
  });

  const columns = [
    {
      title: "ProductName",
      dataIndex: "ProductName",
    },
    {
      title: "PurchasePrice",
      dataIndex: "PurchasePrice",
    },   
    {
      title: "ProductAmount",
      dataIndex: "prductAmount",
    },
    {
      title: "SubTotal",
      dataIndex: "SubTotal",
      render: (SubTotal) => SubTotal + "  USD",
    },
  ];
  return (
    <>
      <Row>
        <Col md={12}>
          <p>StockCode: {stock.stockCode}</p>
        </Col>
        <Col md={12}>
          <p>BuisnessLocation: {stock.buisnessLocation}</p>
        </Col>
      </Row>
      <div>
        {loading && <Loading />}
        <Table columns={columns} dataSource={arr} />
      </div>
    </>
  );
}

export default SotockView;
