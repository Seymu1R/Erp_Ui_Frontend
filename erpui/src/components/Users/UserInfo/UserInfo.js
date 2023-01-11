import React from 'react'
import { Col, Row, Card, Avatar } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

function UserInfo() {
    
  return (
    <Row>
    <Col span={18} push={6}>

    </Col>
    <Col span={6} pull={18}>
    <Card
    style={{
      width: 300,
    }}
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
    actions={[      
      <Link to = '/edituser' ><EditOutlined key="edit"/></Link>     
    ]}
  >
    <Meta
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
      title="Username"
      description="Admin"
    />
  </Card>
    </Col>
  </Row>
  )
}

export default UserInfo