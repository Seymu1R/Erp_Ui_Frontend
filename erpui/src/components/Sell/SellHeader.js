import React from "react";
import { Col, Row, Tooltip } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DownloadTableExcel } from "react-export-table-to-excel";

function SellHeader({tableRef}) {
  return (  
    <Row style={{ marginBottom: "20px", justifyContent:"space-between"}}>
    <Col md={4}>
     <Tooltip title="Add Sell" color={"#2b80ec"}>
       <Link to="/addsell">
         <AppstoreAddOutlined
           style={{
             fontSize: "30px",
             color: "#2b80ec",
           }}
         />
       </Link>
     </Tooltip>
   </Col>
   <Col md={4}>
     <DownloadTableExcel
       filename="Sell table"
       sheet="Sales"
       currentTableRef={tableRef.current}
     >
       <button style={{background:"#2c86dd", color:"white"}} > Export excel </button>
     </DownloadTableExcel>
   </Col>
  
  </Row>
  );
}
export default SellHeader;
