import React from "react";
import { Col, Row, Input } from "antd";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function AddStock() {
    return (
        <form>
          <Row style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <label htmlFor="buisnesslocation">BuisnessLocation</label>
              <Input
                type="text"
                id="buisnesslocation"
                size="large"
                placeholder="BuisnessLocation"
              />
            </Col>
           
          </Row>
          <Link to = "/stocklist" >
          <Button variant="primary">Add</Button>
          </Link>    
          
        </form>
      );
    }
export default AddStock