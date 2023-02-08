import React from 'react'
import { Col, Row , Tooltip  } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { DownloadTableExcel } from "react-export-table-to-excel";
import { Link } from "react-router-dom";

function ProductHeader({tableRef}) {
  return ( 
  <Row style={{ marginBottom: "20px", justifyContent:"space-between"}}>
  <Col md={4}>
   <Tooltip title="Add Product" color={"#2b80ec"}>
     <Link to="/addproduct">
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
     filename="products table"
     sheet="products"
     currentTableRef={tableRef.current}
   >
     <button style={{background:"#2c86dd", color:"white"}} > Export excel </button>
   </DownloadTableExcel>
 </Col>

</Row>
  )
}

export default ProductHeader