import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ErorModal({ data, statusCode, setmodalHandler, usename }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    setmodalHandler(false);
  };
console.log(data);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{statusCode}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>{usename}</p>
        
          <p>{data && data.PhoneNumber}</p>
          <p>{data && data.UserName}</p>
          <p>{data && data.FatherName}</p>
          <p>{data && data.SurName}</p>
          <p>{data && data.Email}</p>
          <p>{data && data.Password}</p>
          <p>{data && data.ConfirmPassword}</p>
          <p>{data && data.Name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ErorModal;
