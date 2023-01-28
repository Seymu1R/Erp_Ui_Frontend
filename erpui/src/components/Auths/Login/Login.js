import React from "react";
import { useContext } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ErpContext from "../../store/erp-context";
import { authservices } from "../../APIs/Services/AuthService";
import { roleservice } from "../../APIs/Services/RoleServices";

const Login = () => {
  const navigate = useNavigate();
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
          });
        });
      })
      .finally(navigate("/"));
  };

  return (
    <Row style={{justifyContent:"center" , background: "#cce7e8", alignItems:"center", height:"100vh" }} >
      <Col span={12}>
        <h1 style={{textAlign:'center', marginBottom:"20px"}} >Basic Erp</h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={(values) => {
            const loginObj = {
              userName: `${values.userName}`,
              password: `${values.password}`,
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
  );
};
export default Login;
