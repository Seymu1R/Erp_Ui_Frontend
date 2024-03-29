import Header from "../Header/Header";
import "./SideBar.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useState } from "react";
import {
  ContactsOutlined,
  ToTopOutlined,
  PieChartOutlined,
  CodepenOutlined,
  UserOutlined,
  VerticalAlignBottomOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Navigate from "../../routes/Routes";
import { authservices } from "../APIs/Services/AuthService";
import ErpContext from "../store/erp-context";
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
    getItem("Banks", "banks"),
  ]),
  getItem("Products", "2", <CodepenOutlined />, [
    getItem("List Products", "productlist"),
    getItem("Add Product", "addproduct"),
    getItem("Units", "units"),
    getItem("Categories", "categories"),
    getItem("Brands", "brands"),
  ]),
  getItem("Purchases", "3", <VerticalAlignBottomOutlined />, [
    getItem("List Purchases", "purchases"),
    getItem("Add Purchase", "addpurchase"),
  ]),
  getItem("Sell", "4", <ToTopOutlined />, [
    getItem("All Sales", "sales"),
    getItem("Add Sell", "addsell"),
    getItem("Discounts", "discounts"),
  ]),
  getItem("Stock", "6", <DatabaseOutlined />, [
    getItem("Stocks List", "stocklist"),
    getItem("Add Stock", "addstock"),
  ]),
];

function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [{ auth, setAuth }] = useContext(ErpContext);

  const sendRefreshToken = () => {
    authservices
      .createRefreshToken({ refreshToken: `${auth.RefreshToken}` })
      .then(({ data: token }) => {
        setAuth({
          AccesToken: token.data.accessToken,
          RefreshToken: token.data.refreshToken,
          Roles: auth.Roles,
          UserName: `${auth.UserName}`,
          userId: `${auth.userId}`,
        });
      });
  };

  return (
    <Layout
      onClick={sendRefreshToken}
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          background: " #cce7e8",
        }}
      >
        <img
          style={{ width: "200px", height: "120px" }}
          src={`${process.env.PUBLIC_URL}/assets/images/logo_transparent.png`}
          alt="logo"
        />

        <div />

        <Menu
          onClick={({ key }) => {
            navigate(key);
          }}
          theme="white"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            background: " #cce7e8",
            color: "black",
          }}
        ></Menu>
      </Sider>

      <Layout className="site-layout">
        <Header />
        <Content
          style={{
            background: " #cce7e8",
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
              background: "#cce7e8",
            }}
          >
            <Navigate />
          </div>
        </Content>

        <Footer
          style={{
            textAlign: "center",
            background: "#cce7e8",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SideBar;
