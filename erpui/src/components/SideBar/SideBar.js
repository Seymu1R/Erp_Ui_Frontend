import Header from "../Header/Header";
import "./SideBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import {
  ContactsOutlined,
  ToTopOutlined,
  PieChartOutlined,
  CodepenOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  CarOutlined,
  DatabaseOutlined,
  MoneyCollectOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navigate from "../../routes/Routes";
const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Home", "/", <PieChartOutlined />),
  getItem("UserManagment", "user", <UserOutlined />, [
    getItem("Users", "users"),
    getItem("Roles", "roles"),
  ]),
  getItem("Contacts", "1", <ContactsOutlined />, [
    getItem("Suppliers", "suppliers"),
    getItem("Customers", "customers"),
  ]),
  getItem("Products", "2", <CodepenOutlined />, [
    getItem("List Products", "productlist"),
    getItem("Add Product", "addproduct"),
    getItem("Variations ", "variations"),
    getItem("Units", "units"),
    getItem("Categories", "categories"),
    getItem("Brands", "brands")    
  ]),
  getItem("Purchases", "3", <VerticalAlignBottomOutlined />, [
    getItem("List Purchases", "purchases"),
    getItem("Add Purchase", "addpurchase"),
  ]),
  getItem("Sell", "sell", <ToTopOutlined />, [
    getItem("All Sales", "sales"),
    getItem("Add Sell", "addsell"),
    getItem("Discounts", "discounts"),
  ]),
  getItem("StockTransfer", "transfer", <CarOutlined />, [
    getItem("Stock Transfer List", "stock-transfer-list"),
    getItem("Add Transfer", "8"),
  ]),
  getItem("Stock", "stock", <DatabaseOutlined />, [
    getItem("Stocks List", "stock-list"),
    getItem("Add Stock", "add-stock"),
  ]),
  getItem("PaymentAccount", "payment", <MoneyCollectOutlined />, [
    getItem("Balance Sheet", "balance-sheet"),
    getItem("Trial Ballance", "trial-balance"),
    getItem("Cash Flow", "cash-flow"),
  ]),
  getItem("Reports", "report", <BarChartOutlined />, [
    getItem("Profit", "profit"),
    getItem("Purchase Report", "purchase-report"),
    getItem("Sales Report", "sale-report"),
  ]),
];

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: " #fff",
        }}
      >
        <div />
        <Menu
        onClick={({key})=>{
            navigate(key);                                                                             
        }}
          theme="white"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            background: " #fff",
            color: "black",
          }}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{pathname}</Breadcrumb.Item>            
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >            
            <Navigate/>            
          </div>
        </Content>
        
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SideBar;
