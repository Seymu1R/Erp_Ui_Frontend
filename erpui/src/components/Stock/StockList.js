import React,{useContext, useState, useEffect} from "react";
import ErpContext from "../store/erp-context";
import { Table } from "antd";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import StockHeader from "./StockHeader";
import { stockservices } from "../APIs/Services/StockService";
import DeleteModal from "../UI/DeleteModal";


function StockList() {
  
  const [{ deleteState, setDeleteState, setId }] = useContext(ErpContext);
  const [stocklist, setStockList] = useState([]);

  useEffect(() => {
    stockservices.getAllStocks().then(({ data: stocks }) => {
      setStockList(stocks.data);
    });
  }, [deleteState]);

  const deleteStock = (id) => {
    stockservices.deleteStock(id).then((data) => {
      console.log(data.message);
    });
  };

  const deleteMOdalHandling = (id) => {
    setId(id);
    setDeleteState(true);
  };

  
      const columns = [
        {
          title: "StockCode",
          dataIndex: "stockCode",          
        }, 
        {
            title: "BuisnessLocation",
            dataIndex: "buisnessLocation",
          },      
        {
          title: "TotalAmount",
          dataIndex: "totalAmount",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.totalamount - b.totalamount,
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
              <Link to="/editstock">
                <Button
                  id={record.id}
                  onClick={() => {
                    setId(record.id)
                  }}
                  variant="primary"
                >
                  Edit
                </Button>
              </Link>
              <Link to="">
                <Button id={record.id} variant="info">
                  Deactive
                </Button>
              </Link>
            </div>
          ),
        },
      ]; 
     
    
      return (
        <>
        {deleteState && <DeleteModal deleteItem={deleteStock} />}
          <StockHeader/>        
          <Table columns={columns} dataSource={stocklist}  />
        </>
      );
}

export default StockList