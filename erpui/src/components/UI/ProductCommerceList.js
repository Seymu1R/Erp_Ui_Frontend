import React, { useContext, useEffect, useState } from "react";
import ErpContext from "../store/erp-context";
import { Table, Button } from "antd";
import DeleteModal from "../UI/DeleteModal";
import { Link } from "react-router-dom";
import { productcommerceservices } from "../APIs/Services/ProductCommerce";
import { productservices } from "../APIs/Services/ProductServices";

function ProductCommerceList({ sellId }) {
  const [product, setProduct] = useState({});
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [productCommerces, setProductcommerces] = useState([]);

  useEffect(() => {
    productcommerceservices
      .getAllProductCommerce()
      .then(({ data: productcommerces }) => {
        setProductcommerces(productcommerces.data);
      });
  }, []);
  const modifiedData = productCommerces.filter((item) => {
    return item.sellId === sellId;
   
  });
const Arr2 = []
  modifiedData.forEach((item) => {
    productservices
    .getProduct(item.productId)
    .then(({ data: product }) => {
        Arr2.push(product.data)
    });
  })
  console.log(Arr2);

  const Arr = modifiedData.map((pc) => {
    return {
      ...pc,
      ProductName: product.name,
      SellingPrice: product.sellingPrice,
      SubTotal: +(product.sellingPrice * product.productAmount),
    };
  });

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
      dataIndex: "productAmount",
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

          <Link to="/productlist/view">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="info"
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };
  const deleteProductCommerce = (id) => {
    productcommerceservices.deleteProductCommerce(id).then((data) => {
      console.log(data.message);
    });
  };

  return (
    <div>
      {deleteState && <DeleteModal deleteItem={deleteProductCommerce} />}
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={Arr}
      />
    </div>
  );
}

export default ProductCommerceList;
