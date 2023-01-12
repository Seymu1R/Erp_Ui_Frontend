import React from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { Modal } from "antd";
const { confirm } = Modal;

const DeleteModal = () => {
   confirm({
    title: "Are you sure delete this task?",
    icon: <ExclamationCircleFilled />,
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

export default DeleteModal;


