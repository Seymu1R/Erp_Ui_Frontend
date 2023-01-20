import React, {useContext, useState, useEffect} from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import VariationHeader from "./VariationHeader";

function Variationslist() {

  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [brandList, setBrandlist] = useState([]);

  useEffect(() => {
    brandservices.getAllBrands().then(({ data: brands }) => {
      setBrandlist(brands.data);
    });
  }, [deleteState]);

  const deleteBrand = (id) => {
    brandservices.deleteBrand(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Variations",
      dataIndex: "variations",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.variations - b.variations,
    },
    {
      title: "Values",
      dataIndex: "values",
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

          <Link to="/variations/update">
            <Button
              id={record.id}
              onClick={() => {
                setId(record.id);
              }}
              variant="primary"
            >
              Edit
            </Button>
          </Link>
        </div>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      customercode: "xxx",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      customercode: "ppp",
      age: 42,
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      customercode: "yyy",
      age: 32,
      address: "Sidney No. 1 Lake Park",
    },
    {
      key: "4",
      customercode: "xyz",
      age: 32,
      address: "London No. 2 Lake Park",
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      <VariationHeader />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}

export default Variationslist;
