import React from 'react'
import { Table, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import VariationHeader from './VariationHeader';

function Variationslist() {
    const items = [       
        {
          label: (
            <Link to='/variations/update'>
              <Button variant="warning">Edit</Button>
            </Link>
          ),
          key: "1",
        },
        {
          label: <Button variant="danger">Delete</Button>,
          key: "2",
        },       
      ];
      const columns = [
        {
          title: "Variations",
          dataIndex: "variations", 
          defaultSortOrder: 'descend',
         sorter: (a, b) => a.variations - b.variations,  
        },        
        {
          title: "Values",
          dataIndex: "values",
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
          <VariationHeader/>     
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </>
      );
}

export default Variationslist