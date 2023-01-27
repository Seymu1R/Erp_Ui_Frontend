import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/esm/Button";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import { productservices } from "../APIs/Services/ProductServices";
import Loading from "./Loading";

function ProductCommerceList({ sellId }) {
  const [productList, setProductList] = useState([]);
  const [
    {  setLoading, setTotal, loading },
  ] = useContext(ErpContext);
  const [productCommerces, setProductcommerces] = useState([]);

  useEffect(() => {
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProductList(products.data);
      productcommerceservices
        .getAllProductCommerce()
        .then(({ data: productcommerces }) => {
          setProductcommerces(productcommerces.data);
        })
        .finally(setLoading(false));
    });
  }, [loading, setLoading]);

  const modifiedData = productCommerces.filter((item) => {
    return item.sellId === sellId;
  });

  const arr = modifiedData.map((item) => {
    for (let j = 0; j < productList.length; j++) {
      if (item.productId === productList[j].id) {
        return {
          id: item.id,
          prductAmount: item.productAmount,
          ProductName: productList[j].name,
          SellingPrice: productList[j].sellingPrice,
          SubTotal: productList[j].sellingPrice * item.productAmount,
        };
      }
    }
  });

  if (arr.length !== 0) {
    let totalSelling = 0;
    arr.forEach((el) => {
      totalSelling += el.SubTotal;
      setTotal(totalSelling);
    });
  }

  
  const deleteProductCommerce = (id) => {
    productcommerceservices.deleteProductCommerce(id).then((data) => {
      setLoading(true)
    }).finally(setLoading(false));
  };

  const columns = [   
    {
      title: "ProductName",
      dataIndex: "ProductName",
    },
    {
      title: "SellingPrice",
      dataIndex: "SellingPrice",
    },
    {
      title: "ProductAmount",
      dataIndex: "prductAmount",
    },
    {
      title: "SubTotal",
      dataIndex: "SubTotal",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex ">
          <Button
            id={record.id}
            onClick={() => {
              deleteProductCommerce(record.id);              
            }}
            className="margin "
            variant="danger"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {loading && <Loading />}      
      <Table columns={columns} dataSource={arr} />
    </div>
  );
}

export default ProductCommerceList;
