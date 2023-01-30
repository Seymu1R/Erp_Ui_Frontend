import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bankservices } from "../APIs/Services/BankServices";
import { useForm } from "antd/es/form/Form";

function UpdateBank() {
    let { bankid } = useParams();
  const [form] = useForm();
  const navigation = useNavigate();

  useEffect(() => {
    bankservices.getBank(bankid).then(({ data: bank }) => {
      form.setFieldsValue({
        bankName: bank.data.bankName,
        bankBalance : bank.data.bankBalance        
      });
    });
  }, [bankid, form]);

  const updateBank = (body) => {
    bankservices
      .updateBank(body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((eror) => {
        window.alert(eror);
      })
      .finally(navigation("/banks"));
  };

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinish={(values) => {
        console.log(values);
        const postObj = {
          id: `${bankid}`,
          bankName: `${values.bankName}`,
          bankBalance: values.bankBalance,
        };
        updateBank(postObj);
      }}
    >
      <Row style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please enter your BankName",
                whitespace: true,
                min: 3,
                max: 20,
              },
            ]}
            hasFeedback
            name="bankName"
            label="BankName"
          >
            <Input
              type="text"
              id="bankName"
              size="large"
              placeholder="BrandName"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            hasFeedback
            name="bankBalance"
            label="BankBalance"
          >
            <Input
              type="number"
              id="bankBalance"
              size="large"
              placeholder="BankBalance"
              style={{ width: "90%" }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Button htmlType={"submit"} type="primary">
        Update
      </Button>
    </Form>
  );
}

export default UpdateBank;
