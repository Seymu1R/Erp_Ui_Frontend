import React, { useContext, useState, useEffect } from "react";
import ErpContext from "../../store/erp-context";
import { Image } from "antd";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link, useParams } from "react-router-dom";
import { userservice } from "../../APIs/Services/UserServices";
import { roleservice } from "../../APIs/Services/RoleServices";

function UserInfo() {
  const [{ setId }] = useContext(ErpContext);
  const [roles, setRole] = useState([]);
  let { userId } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    userservice.getUser(userId).then(({ data: user }) => {
      setUser(user.data);
      roleservice.getRoleUser(user.data.userName).then(({ data: role }) => {
        setRole(role.data);
      });
    });
   
  }, [userId]);
  return (
    <Container>
      <Row>
        <Col xs="12" sm="4">
          <Card>
            <Image width={386} src="https://picsum.photos/300/200" />

            <CardBody>
              <CardTitle>
                <h2>Role: {roles} </h2>
              </CardTitle>
              <Link to={`/edituser/${userId}`}>
                <Button
                  style={{ backgroundColor: "#002140" }}
                  onClick={() => {
                    setId(user.id);
                  }}
                >
                  Edit User
                </Button>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="8">
          <Card>
            <CardBody style={{ fontSize: "25px", height: "382px" }}>
              <CardText>Name: {user.name}</CardText>
              <CardText>SurName: {user.surName}</CardText>
              <CardText>FatherName: {user.fatherName}</CardText>
              <CardText>UserName: {user.userName}</CardText>
              <CardText>Email: {user.email}</CardText>
              <CardText>Phone: {user.phoneNumber}</CardText>
              <CardText>UserName: {user.userName}</CardText>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default UserInfo;
