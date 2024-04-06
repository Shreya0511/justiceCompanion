import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { AuthData } from "../services/AuthService";
import axios from "axios";
import getCookies from "../hooks/getCookies";

const DeleteChatModal = () => {
  const { selectedChat, user } = AuthData();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookies("jwt")}`,
        },
      };
      const { data } = await axios.delete(
        `http://127.0.0.1:5001/api/v1/chats/deleteGroup/${selectedChat._id}`,
        config
      );

      handleClose();
    } catch (err) {
      alert(
        "Some error sending deleting the room. Please try again after some time!!"
      );
      console.log("Error", err);
    }
  };
  return (
    <div>
      <Button style={{ backgroundColor: "black" }} onClick={handleShow}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* <Modal.Title>Modal title</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          Do you want to permanently Delete the room chat ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteChatModal;
