import React from "react";
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import StockTransferHeader from "./StockTransferHeader";

function StockTransferList() {
    const items = [
        {
          label: <Button variant="info">View</Button>,
          key: "0",
        },
        {
          label: (
            <Link to="/stocktransfer/edit">
              <Button variant="warning">Edit</Button>
            </Link>
          ),
          key: "1",
        },
        {
          label: <Button variant="danger">Delete</Button>,
          key: "2",
        },
        {
          label: <Button variant="primary">Deactive</Button>,
          key: "3",
        },
      ];
      const columns = [
        {
          title: "TransferCode",
          dataIndex: "transfercode",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.transfercode - b.transfercode,
        },
        {
          title: "Stautus",
          dataIndex: "stautus",
          filters: [
            {
              text: "Pending",
              value: "Pending",
            },
            {
              text: "Intransit",
              value: "Intransit",
            },
            {
              text: "Completed",
              value: "Completed",
            },
          ],
          onFilter: (value, record) => record.address.startsWith(value),
          filterSearch: true,
        },
        {
          title: "StockFrom",
          dataIndex: "stockfrom",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.stockfrom - b.stockfrom,
        },
        {
            title: "StockTo",
            dataIndex: "stockto",
            defaultSortOrder: "descend",
            sorter: (a, b) => a.stockto - b.stockto,
          },
        {
          title: "AdditionalNotes",
          dataIndex: "additionalnotes",
        },
        {
          title: "Total",
          dataIndex: "total",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.total - b.total,
        },
        {
          title: "CreatedTime",
          dataIndex: "createdtime",
          defaultSortOrder: "descend",
          sorter: (a, b) => a.createdtime - b.createdtime,
        },
    
        {
          title: "Actions",
          dataIndex: "action",
          render: () => (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Link onClick={(e) => e.preventDefault()}>
                <Space>
                  <DownOutlined />
                </Space>
              </Link>
            </Dropdown>
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
        <StockTransferHeader/>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
      );
}

export default StockTransferList