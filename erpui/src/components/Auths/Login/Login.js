import React, { useState } from "react";
import { useContext } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import ErpContext from "../../store/erp-context";
import { authservices } from "../../APIs/Services/AuthService";
import { roleservice } from "../../APIs/Services/RoleServices";
import ErorModal from "../../UI/ErorModal";

const Login = () => {
  const [modalHandler, setModalHandler] = useState(false);
  const [erorStatusCode, setErorStatusCode] = useState("");
  const [erorDatalogin, setErorDatalogin] = useState("")
  const [{ setAuth }] = useContext(ErpContext);

  const createToken = (loginObj) => {
    authservices
      .createToken(loginObj)
      .then(({ data: token }) => {
        roleservice.getRoleUser(loginObj.userName).then(({ data: roles }) => {
          console.log(roles.data);
          setAuth({
            AccesToken: token.data.accessToken,
            Roles: roles.data,
            UserName: loginObj.userName,
            userId: token.data.userId
          });
        });
      }).catch(function (error) {
        if (error.response) {         
          setErorStatusCode(error.response.status)
          setErorDatalogin("Username or password is wrong !")         
          setModalHandler(true)
        } else if (error.request) {          
          console.log(error.request);
        } else {          
          console.log('Error', error.message);
        }
        console.log(error.config);
      })
     
  };

  return (
    <>
     { modalHandler && <ErorModal datalogin={erorDatalogin} setmodalHandler = {setModalHandler} statusCode = {erorStatusCode} />}
     <Row style={{justifyContent:"center" , background: "#cce7e8", alignItems:"center", height:"100vh" }} >
      <Col span={12}>
      <img style={{marginLeft:"195px" }} width={385} src={`${process.env.PUBLIC_URL}/assets/images/logo_transparent.png`} alt="logo" />
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => {
            const loginObj = {
              userName: `${values.userName}`,
              password: `${values.password}`
            };
            createToken(loginObj);
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Link to="/register">
            <p style={{ textAlign: "center" }}>Create Accaunt</p>
          </Link>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </>   
  );
};
export default Login;
