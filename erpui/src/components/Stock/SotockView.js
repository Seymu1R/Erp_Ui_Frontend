import React, { useContext, useEffect, useRef, useState } from "react";
import { Row, Col, Table } from "antd";
import { useParams } from "react-router-dom";
import { stockservices } from "../APIs/Services/StockService";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import Loading from "../UI/Loading";
import ErpContext from "../store/erp-context";
import { productservices } from "../APIs/Services/ProductServices";
import { DownloadTableExcel } from "react-export-table-to-excel";


function SotockView() {
  const [{ loading, setLoading }] = useContext(ErpContext);
  const { stockId } = useParams();
  const [stock, setStock] = useState({});
  const [productCommercelist, setProductCommerceList] = useState([]);
  const [productList, setProductList] = useState([]);
  const tableRef = useRef(null);


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

  const thisProductCommerslist = productCommercelist.filter((item) => {
      return item.stockId === stockId}     
  )


  const modifiedList = thisProductCommerslist.map((item) => {
    if (item.sellId !== null) {
      return { ...item, productAmount: -item.productAmount };
    }
    if (item.purchaseId !== null) {
      return { ...item, productAmount: item.productAmount };
    }
  }); 

const endresult = Object.values(modifiedList.reduce((value, object) => {
  if (value[object.productId]) {
    value[object.productId].productAmount += object.productAmount; 
    value[object.productId].count++;

} else {
    value[object.productId] = { ...object , count : 1
    };
  }
  return value;
}, {}));


const clientViewList = endresult.map((item) => {
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
        <Col md={8}>
          <p>StockCode: {stock.stockCode}</p>
        </Col>
        <Col md={8}>
          <p>BuisnessLocation: {stock.buisnessLocation}</p>
        </Col>
        <Col md={8}>
        <DownloadTableExcel
       filename="Stock table"
       sheet="Stocks"
       currentTableRef={tableRef.current}
     >
       <button style={{background:"#2c86dd", color:"white"}} > Export excel </button>
     </DownloadTableExcel>
        </Col>        
      </Row>
      <>
        {loading && <Loading />}
        <Table ref={tableRef} columns={columns} dataSource={clientViewList} />
      </>
    </>
  );
}

export default SotockView;
