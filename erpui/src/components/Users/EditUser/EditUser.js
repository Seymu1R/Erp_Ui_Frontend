import React, { useEffect, useState } from "react";
import "../AddUsers/AddUsers.scss";
import { Col, Row, Input, Select, Form } from "antd";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { userservice } from "../../APIs/Services/UserServices";
import { useForm } from "antd/es/form/Form";
import { roleservice } from "../../APIs/Services/RoleServices";

function EditUser() {
  const [form] = useForm();
  let { userId } = useParams();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    userservice.getUser(userId).then(({ data: user }) => {
      form.setFieldsValue({
        userName: user.data.userName,
        email: user.data.email,
        phoneNumber: user.data.phoneNumber,
        name: user.data.name,
        surName: user.data.surName,
        fatherName: user.data.fatherName,
      });
    });
    roleservice.getAllRoles().then(({ data: roles }) => {
      setRoles(roles.data);
    });
  }, [form, userId]);

  const optionsRoles = roles.map((role) => {
    return { label: role.name, value: role.name };
  });

  const updateUser = (body) => {
    userservice.editUser(body).then(({ data: user }) => {
      console.log(user.data);
    });
  };

  const assignRole = (body) =>{
    userservice.assignRoleToUser(body).then(({data:role}) => {
       console.log(role.data);
    })
  }

  return (
    <>
      <Form
        form={form}
        autoComplete="off"
        onFinish={(values) => {
          console.log(values);
          const Obj = {
            id: userId,
            userName: `${values.userName}`,
            email: `${values.email}`,
            phoneNumber: `${values.phoneNumber}`,
            name: `${values.name}`,
            surName: `${values.surName}`,
            fatherName: `${values.fatherName}`,
          };
          updateUser(Obj);
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
        <Button type="submit" variant="primary">
          EditUser
        </Button>
      </Form>
      <Form
       autoComplete="off"
       onFinish={(values) => {
         console.log(values);
         const Obj = {
          userId: `${userId}`,
          roleName: `${values.roleName}`        
         };      
         assignRole(Obj)
       }}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              hasFeedback
              name="roleName"
              label="Role"
            >
              <Select
                style={{
                  width: "100%",
                }}
                options={optionsRoles}
              />
            </Form.Item>
          </Col>
        </Row>
        <Button type="submit" variant="primary">Assign Role</Button>
      </Form>
    </>
  );
}

export default EditUser;
