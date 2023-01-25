import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/esm/Button";
import DeleteModal from "../UI/DeleteModal";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import { productservices } from "../APIs/Services/ProductServices";

function ProductCommerceListPurchase({productId}) {
  const [productList, setProductList] = useState([]);
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [productCommerces, setProductcommerces] = useState([]);

  useEffect(() => {
    productcommerceservices
      .getAllProductCommerce()
      .then(({ data: productcommerces }) => {
        setProductcommerces(productcommerces.data);
      });
    productservices.getAllpRoducts().then(({ data: products }) => {
      setProductList(products.data);
    });
  }, []);
  const modifiedData = productCommerces.filter((item) => {
    return item.productId === productId;
  });

  const productCommerceList = modifiedData.map((item) => {
    for (let j = 0; j < productList.length; j++) {
      if (item.productId === productList[j].id) {
        return {
          prductAmount: item.productAmount,
          ProductName: productList[j].name,
          PurchasePrice: productList[j].purchasePrice,
          SubTotal : productList[j].sellingPrice*item.productAmount
        };
      }
    }
  });
console.log(productCommerceList);
  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };
  const deleteProductCommerce = (id) => {
    productcommerceservices.deleteProductCommerce(id).then((data) => {
      console.log(data.message);
    });
  };

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
              deleteMOdalHandling(record.id);
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

  return <div>
      {deleteState && <DeleteModal deleteItem={deleteProductCommerce} />}
      <Table rowKey={(record) => record.id} columns={columns} dataSource={productCommerceList} />
    </div>;
}

export default ProductCommerceListPurchase;
