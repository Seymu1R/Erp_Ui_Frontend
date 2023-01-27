import React, { useState, useContext, useEffect } from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import UnitsHeader from "./UnitsHeader";
import { unitservices } from "../APIs/Services/UnitsServices";
import DeleteModal from "../UI/DeleteModal";
import Loading from "../UI/Loading";

function UnitList() {
  const [{ deleteState, setDeleteState, setId, loading, setLoading }] =
    useContext(ErpContext);
  const [unitlist, setUnitList] = useState([]);

  useEffect(() => {
    unitservices.getAllUnits().then(({ data: units }) => {
      setUnitList(units.data);
    }).finally(setLoading(false));
  }, [loading ,setLoading]);

  const deleteUnit = (id) => {
    unitservices.deleteUnit(id).then((data) => {
      setLoading(true)
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "unitName",
    },
    {
      title: "Short Name",
      dataIndex: "unitType",
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
          <Link to='/units/update'>
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
      {loading && <Loading/>}
      {deleteState && <DeleteModal deleteItem={deleteUnit} />}
      <UnitsHeader />
      <Table
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={unitlist}
      />
    </>
  );
}

export default UnitList;
