import React, { useContext } from "react";
import { Row, Col, Space, Dropdown, Button } from "antd";
import ErpContext from "../store/erp-context";
import { Link, redirect, useNavigate } from "react-router-dom";

function Header() {
  const [{ auth }] = useContext(ErpContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("auth");
    window.location.reload();    
    redirect("/login")
  };

  var currentdate = new Date();
  var datetime =
    
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() 
   
  const items = [
    {
      key: "1",
      label: <Link to={`/userinfo/${auth.userId}`}>UserInfo</Link>,
    },
    {
      key: "2",
      label: <Link onClick={logOut}>LogOut</Link>,
    },
  ];

  return (
    <Row style={{ background: "#2c86dd "}}>
      <Col span={4}style={{ background: "#2c86dd ", padding:"20px"}}>
       
      </Col>
      <Col
        style={{
          justifyContent: "right",
          display: "flex",
          alignItems: "center",
        }}
        span={20}
      >
        <Col
          style={{
            justifyContent: "right",
            display: "flex",
            alignItems: "center",
            color:"#fff",
            fontSize:"20px"
          }}
          span={4}
        >
          {datetime}
        </Col>
        <Col
          style={{
            justifyContent: "right",
            display: "flex",
            alignItems: "center",
          }}
          span={4}
        >
          <Space style={{ marginRight: "20px" }} direction="vertical">
            <Space wrap>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomLeft"
              >
                <Button style={{ padding:"0px, 10px",margin:"0", background: "#2c86dd ", color: "#fff" }}>
                  {auth.UserName}
                </Button>
              </Dropdown>
            </Space>
          </Space>
        </Col>
      </Col>
    </Row>
  );
}
export default Header;
