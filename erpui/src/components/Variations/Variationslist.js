import React, {useContext, useState, useEffect} from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import VariationHeader from "./VariationHeader";
import { variationservices } from "../APIs/Services/VariationServices";
import DeleteModal from "../UI/DeleteModal";

function Variationslist() {
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [variationList, setVariationList] = useState([]);

  useEffect(() => {
    variationservices.getAllVariations().then(({ data: variations }) => {
      setVariationList(variations.data);
    });
  }, [deleteState]); 

  const deleteVariation = (id) => {
    variationservices.deleteVariation(id).then((data) => {
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
      dataIndex: "variationName",
      key:"variationName"     
    },
    {
      title: "Values",
      dataIndex: "variationValues",
      key: "variationValues",
      render : (variationValues) => variationValues.map((values=>values.concat(",")))
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
  

  return (
    <>
    {deleteState && <DeleteModal deleteItem={deleteVariation} />}
      <VariationHeader />
      <Table  rowKey={(record) => record.id} columns={columns} dataSource={variationList}  onChange={()=>{"Seymur"}}/>
    </>
  );
}

export default Variationslist;
