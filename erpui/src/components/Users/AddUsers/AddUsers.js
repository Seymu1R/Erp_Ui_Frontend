import React, { useEffect, useState } from "react";
import "./AddUsers.scss";
import { Col, Row, Input, Form, Button } from "antd";
import { userservice } from "../../APIs/Services/UserServices";
import { useNavigate } from "react-router-dom";
import ErorModal from "../../UI/ErorModal";

function AddUsers() {
const navigate = useNavigate()
const [modalHandler, setModalHandler] = useState(false);
const [erorStatusCode, setErorStatusCode] = useState("");
const [usenameTaken, setUserNameTaken] = useState("");
const [erorData, setErorData] = useState({});

  const addUSer = (body) => {
    userservice
      .createUser(body)
      .then(({data : response}) => {
        if (response.statusCode) {
          navigate("/users");
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
    <Form
      autoComplete="off"
      onFinish={(values) => {
        const postObj = {
          name: `${values.name}`,
          surName: `${values.surName}`,
          email: `${values.email}`,
          fatherName: `${values.fatherName}`,
          userName: `${values.userName}`,
          phoneNumber: `${values.phoneNumber}`,
          password: `${values.password}`,
          confirmPassword: `${values.confirmPassword}`,
        };
        addUSer(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your UserName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="userName"
            label="UserName"
          >
            <Input
              type="text"
              id="userName"
              size="large"
              placeholder="UserName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter a valid Email",
                whitespace: true,
                type: "email",
              },
            ]}
            hasFeedback
            name="email"
            label="Email"
          >
            <Input
              style={{ width: "90%" }}
              type="email"
              id="email"
              size="large"
              placeholder="Email"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter a valid Phonenumber",
                whitespace: true,
              },
            ]}
            hasFeedback
            name="phoneNumber"
            label="PhoneNumber"
          >
            <Input
              type="phone"
              id="phoneNumber"
              size="large"
              placeholder="PhoneNumber"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter valid Name",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="name"
            label="Name"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="name"
              size="large"
              placeholder="Name"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter valid Surname",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="surName"
            label="Surname"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="surName"
              size="large"
              placeholder="Surname"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter valid FatherName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="fatherName"
            label="FatherName"
          >
            <Input
              style={{ width: "90%" }}
              type="text"
              id="fatherName"
              size="large"
              placeholder="FatherName"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                whitespace: true,
                min: 6,
                max: 20,
              },
            ]}
            hasFeedback
            name="password"
            label="Password"
          >
            <Input.Password
              style={{ width: "90%" }}
              type="password"
              id="password"
              size="large"
              placeholder="Password"
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                whitespace: true,
                min: 6,
                max: 20,
              },
            ]}
            hasFeedback
            dependencies={["password"]}
            name="confirmPassword"
            label="Confirm Password"
          >
            <Input.Password
              style={{ width: "90%" }}
              type="password"
              id="confirmPassword"
              size="large"
              placeholder="ConfirmedPassword"
            />
          </Form.Item>
        </Col>        
      </Row>
      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
    </Form>
    </>    
  );
}

export default AddUsers;
