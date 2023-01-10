import Header from "../Header/Header";
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
  getItem("Home", "1", <PieChartOutlined />),
  getItem("UserManagment", "user", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Contacts", "contacts", <ContactsOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Products", "product", <CodepenOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Purchases", "purchases", <VerticalAlignBottomOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Sell", "sell", <ToTopOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("StockTransfer", "transfer", <CarOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Stock", "stock", <DatabaseOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("PaymentAccount", "payment", <MoneyCollectOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Reports", "report", <BarChartOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
];

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
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
          theme="white"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            background: " #fff",
            color: "black",
          }}
        />
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
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            Bill is a cat.
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
  )
}

export default SideBar