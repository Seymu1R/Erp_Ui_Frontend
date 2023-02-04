import React, { useState } from "react";
import { Col, Form, Input, Row, Button } from "antd";
import { userservice } from "../../APIs/Services/UserServices";
import { Link, useNavigate } from "react-router-dom";
import ErorModal from "../../UI/ErorModal";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const Register = () => {
  const [modalHandler, setModalHandler] = useState(false);
  const [erorStatusCode, setErorStatusCode] = useState("");
  const [usenameTaken, setUserNameTaken] = useState("");
  const [erorData, setErorData] = useState({});
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = (values) => {
    userservice
      .createUser({ userName: "Worker", ...values })
      .then(({ data: response }) => {
        if (response.statusCode) {
          navigate("/login");
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 500) {
            setUserNameTaken("Username or Email has been taken");
            setErorStatusCode("500");            
            setModalHandler(true);
          }
          setErorStatusCode(error.response.status);
          setErorData(error.response.data.errors);
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <>
      {modalHandler && (
        <ErorModal
          usename={usenameTaken}
          data={erorData}
          setmodalHandler={setModalHandler}
          statusCode={erorStatusCode}
        />
      )}
      <Row
        style={{
          justifyContent: "center",
          background: "#cce7e8",
          alignItems: "center",
        }}
      >
        <Col span={12}>
          <img
            style={{ marginLeft: "195px" }}
            width={385}
            src={`${process.env.PUBLIC_URL}/assets/images/logo_transparent.png`}
            alt="logo"
          />
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            initialValues={{
              residence: ["zhejiang", "hangzhou", "xihu"],
              prefix: "994",
            }}
            style={{
              maxWidth: 600,
            }}
            scrollToFirstError
          >
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your Name!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="surName"
              label="SurName"
              rules={[
                {
                  required: true,
                  message: "Please input your SurName!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userName"
              label="UseName"
              rules={[
                {
                  required: true,
                  message: "Please input your UseName!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="fatherName"
              label="FatherName"
              rules={[
                {
                  required: true,
                  message: "Please input your FatherName!",
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>
            
            <Form.Item {...tailFormItemLayout}>
            <Link to={'/login'} style={{marginRight:"20px"}} > Have Acaunt?</Link>
              <Button
                style={{ background: "#062d92", textAlign: "center" }}
                type="primary"
                htmlType="submit"
              >
                Register
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      
    </>
  );
};

export default Register;
