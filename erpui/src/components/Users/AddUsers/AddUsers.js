import React, { useEffect, useState } from "react";
import "./AddUsers.scss";
import { Col, Row, Input, Form, Button } from "antd";
import { roleservice } from "../../APIs/Services/RoleServices";
import { userservice } from "../../APIs/Services/UserServices";

function AddUsers() {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    roleservice.getAllRoles().then(({ data: roles }) => {
      const transformedData = roles.data.map((role) => {
        return {
          value: role.name,
          label: role.name,
        };
      });
      setOptions(transformedData);
    });
  }, []);

  const addUSer = (body) => {
    userservice
      .createUser(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      });
  };

  return (
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
        <Col span={8}>
          {/* <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your Role",
              },
            ]}
            hasFeedback
            name="assignrole"
            label="Assign Role"
          >
            <Select
              id="assignrole"
              mode="tags"
              style={{
                width: "100%",
              }}
              tokenSeparators={[","]}
              options={options}
            />
          </Form.Item> */}
        </Col>
      </Row>
      <Button htmlType={"submit"} type="primary">
        Add
      </Button>
    </Form>
  );
}

export default AddUsers;
