import React, { useContext } from 'react'
import { Col, Row, Card, Avatar } from "antd";
import { EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import classes from './UserInfo.module.scss'
import ErpContext from '../../store/erp-context';
const { Meta } = Card;

function UserInfo() {

 const [{item}] =useContext(ErpContext)
    
  return (
    <Row>
    <Col span={18} push={6}>
        <div className='container'>
            <div className='row' >
                <div className='col-md-6' >
                    <ul className={classes.info} >
                        <li>Name</li>
                        <li>Surname</li>
                        <li>Fathername</li>
                        <li>Username</li>
                        <li>Phonenumber</li>
                        <li>Role</li>
                        <li>Isactive?</li>
                    </ul>
                </div>
                <div className='col-md-6' >
                <ul className={classes.info} >
                        <li>{item.name}</li>
                        <li>{item.surName}</li>
                        <li>{item.fatherName}</li>
                        <li>{item.userName}</li>
                        <li>{item.phoneNumber}</li>
                        <li>Role</li>
                        <li>{item.onlineState}?</li>
                    </ul>
                </div>
            </div>
        </div>
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
      title={item.userName}
      description="Role"
    />
  </Card>
    </Col>
  </Row>
  )
}

export default UserInfo