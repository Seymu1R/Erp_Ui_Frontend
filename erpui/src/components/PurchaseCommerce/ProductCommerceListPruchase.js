import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/esm/Button";
import DeleteModal from "../UI/DeleteModal";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import { productservices } from "../APIs/Services/ProductServices";
import Loading from "../UI/Loading";

function ProductCommerceListPruchase({ purchaseId }) {
  const [productList, setProductList] = useState([]);
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [productCommerces, setProductcommerces] = useState([]);
  const [{ loading, setTotal, setLoading }] = useContext(ErpContext);

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
    return item.purchaseId === purchaseId;
  });
  
  const arr = modifiedData.map((item) => {
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
console.log(arr);
  if (arr.length !== 0) {
    let totalPurchase = 0
    arr.forEach((el) => {
      totalPurchase += el.SubTotal 
      setTotal(totalPurchase)
    });
  }

  const deleteProductCommerce = (id) => {
    productcommerceservices
      .deleteProductCommerce(id)
      .then((data) => {
        setLoading(true)
      })
      .finally(setLoading(false));
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
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
      render: (SubTotal) => SubTotal + "  USD",
    },
    {
      title: "Actions",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <div className="d-flex ">
          <Button
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

  return (
    <div>
      {loading && <Loading />}
      {deleteState && <DeleteModal deleteItem={deleteProductCommerce} />}
      <Table columns={columns} dataSource={arr} />
    </div>
  );
}

export default ProductCommerceListPruchase;
