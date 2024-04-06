import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import ChatListItem from "../miscellaneous/ChatListItem";
import { AuthData } from "../../services/AuthService";
import getCookies from "../../hooks/getCookies";
import Spinner from "react-bootstrap/Spinner";
import "../../styles/SideDrawer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SideDrawer = () => {
  // const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [chatLoading, setChatLoading] = useState(false);
  const { user, selectedChat, setSelectedChat, chats, setChats } = AuthData();

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something to search!!");
      return;
    }

    try {
      setLoading(true);
      let userData = {
        jwt: getCookies("jwt"),
      };
      const response = await fetch(
        `http://127.0.0.1:5001/api/v1/chats/getChats?search=${search}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "authorization" : `Bearer ${getCookies("jwt")}`
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setSearchResult(data);
          setChatLoading(false);
        });
    } catch (error) {

      alert("Oops....No Chat Rooms Found!!");
      console.log(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setChatLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${getCookies("jwt")}`,
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:5001/api/v1/chats",
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setChatLoading(false);
      setSelectedChat(data);
      // onClose();
    } catch (err) {
      alert("Error loading the chats!!");
      console.log("Error", err);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <div className="SidedrawerButton" onClick={handleShow} style ={{paddingLeft : "2rem", paddingRight : "2rem"}}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />{" "}
        <div style={{ marginLeft: "0.6rem" }}>Search Rooms</div>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="mb-0">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style ={{display : "flex", margin: "auto", marginTop : "1rem", fontWeight: "bold", color : "chocolate"}}>Search Rooms</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body >
          <div style ={{marginBottom : "2rem"}}>
          <input
            placeholder="Search by room name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            style ={{marginBottom : "0px", marginRight: "1rem", height : "2.1rem", borderRadius: "0.3rem", padding: "0.3rem"}}
          />
          <Button variant="outline-secondary" onClick={handleSearch} style ={{marginBottom : "0px", backgroundColor : "#f3cbae", color : ""}}>
            Search
          </Button>
          </div>
        {loading ? (
          <ChatLoading />
        ) : (
          searchResult?.map((chat) => (
            <>
            <ChatListItem
            key={chat._id}
            chat={chat}
            style ={{marginTop : "10rem"}}
            />
            </>
          ))
        )}

        {chatLoading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Offcanvas.Body>
      </Offcanvas>

    </>
  );
};

export default SideDrawer;
