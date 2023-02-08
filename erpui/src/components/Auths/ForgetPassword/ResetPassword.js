import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { authservices } from "../../APIs/Services/AuthService";
import ErorModal from "../../UI/ErorModal";

function ResetPassword() {
  const [modalHandler, setModalHandler] = useState(false);
  const [erorStatusCode, setErorStatusCode] = useState("");
  const [errorName, setErrorname] = useState("");
  const { userid } = useParams();

  const createToken = (obj) => {
    authservices
      .resetPassword(obj)
      .then(({ data: response }) => {
        if (response.statusCode) {
          setErrorname("Sucessfuly changed password");
          setModalHandler(true);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErorStatusCode(error.response.status);
          setErrorname("Opps, something went wrong !");
          setModalHandler(true);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <>
      {modalHandler && (
        <ErorModal
          usename={errorName}
          setmodalHandler={setModalHandler}
          statusCode={erorStatusCode}
        />
      )}
      <Row
        style={{
          justifyContent: "center",
          background: "#cce7e8",
          alignItems: "center",
          height: "100vh",
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
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={(values) => {
              const obj = {
                id: `${userid}`,
                confirmedPassword: `${values.confirmedPassword}`,
                password: `${values.password}`,
              };
              createToken(obj);
            }}
            autoComplete="off"
          >
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
              name="confirmedPassword"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your ConfirmedPassword!",
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

            <Link to="/login">
              <p style={{ textAlign: "center" }}>Login</p>
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
}

export default ResetPassword;
