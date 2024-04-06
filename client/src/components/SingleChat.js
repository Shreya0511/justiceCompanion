import React, { useEffect } from "react";
import { AuthData } from "../services/AuthService";
import { getSender } from "../services/ChatLogics";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import getCookies from "../hooks/getCookies";
import axios from "axios";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import "./../styles/SingleChat.css";
import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faVideo } from "@fortawesome/free-solid-svg-icons";
import DeleteChatModal from "./DeleteChatModal";
import { NavLink, useNavigate } from "react-router-dom";
import VideoCallModal from "./miscellaneous/VideoCallModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ENDPOINT = "http://localhost:5001";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessages, setNewMessages] = useState();
  const [socketConnected, setSocketConnected] = useState(false);

  const { user, selectedChat, setSelectedChat } = AuthData();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          authorization: `Bearer ${getCookies("jwt")}`,
        },
      };

      setLoading(true);

      const { data } = await axios.get(
        `http://127.0.0.1:5001/api/v1/messages/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      alert("Some Error fetching the messages for the selected chat!!");
      console.log("Error", error);
    }
  };

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessages) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getCookies("jwt")}`,
          },
        };

        setNewMessages("");
        const { data } = await axios.post(
          "http://127.0.0.1:5001/api/v1/messages",
          {
            content: newMessages,
            chatId: selectedChat._id,
          },
          config
        );

        socket.emit("new message", data);
        setMessages([...messages, data]);
      } catch (err) {
        alert("Some error sending the message!! Please try again!");
        console.log("Error", err);
      }
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", JSON.parse(user.user));
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  const typingHandler = (e) => {
    setNewMessages(e.target.value);

    //typing indicator logic
  };

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //display notification
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton style ={{cursor : "pointer"}}>
              <Modal.Title>{selectedChat.chatName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style ={{color : "#C29879", marginBottom : "0.5rem", fontWeight: "medium", fontSize : "1.4rem"}}>Group Members</div>
			  {selectedChat.users ? selectedChat.users .map((user) => (<div style ={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginBottom : "1rem", padding : "1rem", borderRadius : "1rem"}}><span style ={{}}>{user.username} </span></div>)) : <></>}
            </Modal.Body>
          </Modal>
          <div
            className="chat_user"
            style={{ height: "100%", padding: "1rem", display: "flex" }}
          >
            <div className="imageHolder" style={{ flex: "1" }}>
              {!selectedChat.isGroupChat ? (
                <Image
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                  // src= "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  src={
                    selectedChat
                      ? getSender(
                          JSON.parse(user.user).name,
                          selectedChat.users
                        ).image ===
                        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                        ? getSender(
                            JSON.parse(user.user).name,
                            selectedChat.users
                          ).image
                        : `http://localhost:5001/uploads/${
                            getSender(
                              JSON.parse(user.user).name,
                              selectedChat.users
                            ).image
                          }`
                      : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  roundedCircle
                />
              ) : (
                <Image
                  style={{
                    height: "2.5rem",
                    width: "2.5rem",
                  }}
                  src="https://png.pngtree.com/png-vector/20191009/ourmid/pngtree-group-icon-png-image_1796653.jpg"
                  roundedCircle
                />
              )}
            </div>
            <div
              className="username"
              style={{
                flex: "7",
                alignItems: "flex-start",
                justifyContent: "flex-start",
				cursor : "pointer"
              }}
              onClick={handleShow}
            >
              {selectedChat ? (
                <>
                  {!selectedChat.isGroupChat
                    ? getSender(JSON.parse(user.user).name, selectedChat.users)
                        .name
                    : selectedChat.chatName}
                </>
              ) : (
                "Select a chat"
              )}
            </div>

            {JSON.parse(user.user).role === "lawyer" &&
            selectedChat.isGroupChat ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  // marginLeft: "16rem",
                  // paddingBottom : "2rem",
                  marginTop: "0px",
                  flex: "2",
                }}
              >
                <VideoCallModal />
                <DeleteChatModal />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <Spinner
                className="mx-auto mb-9
"
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div
                className="messages"
                style={{
                  flex: "5",
                  // backgroundColor: "pink",
                  border: "1px solid black",
                  borderRadius: "0",
                }}
              >
                {/* {" "} */}
                <ScrollableChat messages={messages} />
                {/* {" "} */}
              </div>
            )}
            <div style={{ flex: "7" }}>
              <Form.Control
                type="text"
                placeholder="Enter a Message!"
                onKeyDown={sendMessage}
                onChange={typingHandler}
                value={newMessages}
                isRequired
                className="mt-10"
                style={{
                  marginTop: "10px",
                  width: "100%",
                  height: "100%",
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            padding: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Welcome Themesian....Select a Chat to start the Conversation!!
        </div>
      )}
    </>
  );
};

export default SingleChat;
