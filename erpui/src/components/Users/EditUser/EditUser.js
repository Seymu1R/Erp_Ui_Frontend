import React  from "react";
import "../AddUsers/AddUsers.scss";
import { Col, Row, Input, Select,Form } from "antd";
import Button from "react-bootstrap/Button";


function EditUser() {
 const itemlocal = JSON.parse(localStorage.getItem('item'));
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

console.log(itemlocal);
  return (
    <Form>
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
              defaultValue={itemlocal?itemlocal.userName:null}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <label htmlFor="email">Email</label>
          <Input  type="email" id="email" size="large" placeholder="Email" />
        </Col>
        <Col span={8}>
          <label htmlFor="phonenumber">PhoneNumber</label>
          <Input
            type="phone"
            id="phonenumber"
            size="large"
            placeholder="PhoneNumber"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="name">Name</label>
          <Input type="text" id="name" size="large" placeholder="Name" />
        </Col>
        <Col span={8}>
          <label htmlFor="surname">SurName</label>
          <Input type="text" id="surname" size="large" placeholder="Surname" />
        </Col>
        <Col span={8}>
          <label htmlFor="fathername">FatherName</label>
          <Input
            type="text"
            id="fathername"
            size="large"
            placeholder="FatherName"
          />
        </Col>
      </Row>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <label htmlFor="assignrole">Assign Role</label>
          <Select
            id="assignrole"
            mode="tags"
            style={{
              width: "100%",
            }}
            tokenSeparators={[","]}
            options={options}
          />
        </Col>
      </Row>
      <Button variant="primary">Edit</Button>
    </Form>
  );
}

export default EditUser;
