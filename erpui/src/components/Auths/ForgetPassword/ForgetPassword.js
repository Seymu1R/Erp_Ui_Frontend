import React, { useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { authservices } from "../../APIs/Services/AuthService";
import ErorModal from "../../UI/ErorModal";

function ForgetPassword() {
  const [modalHandler, setModalHandler] = useState(false);
  const [erorStatusCode, setErorStatusCode] = useState("");
  const [errorName, setErrorname] = useState("");

  const resetPassword = (Obj) => {
    authservices
      .forgetPassword(Obj)
      .then(({ data : response }) => {      
        if (response.statusCode) {
          setErrorname("Please, Check your email !");
          setModalHandler(true);
        }
      })
      .catch(function (error) {
        if (error.response) {
          setErorStatusCode(error.response.status);
          setErrorname("Oops, something went wrong");
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
            <p style={{ textAlign: "left", marginLeft:"150px" }}> Please, enter enter your email </p>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={(values) => {
              const Obj = {
                email: `${values.email}`               
              };
              resetPassword(Obj);
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Link to="/login">
              <p style={{ textAlign: "left", marginLeft:"150px" }}> Return login</p>
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

export default ForgetPassword;
