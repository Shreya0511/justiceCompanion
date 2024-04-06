import React from "react";
import { AuthData } from "../../services/AuthService";
import Card from "react-bootstrap/Card";

const ChatListItem = ({ chat }) => {

  return (
    
    <Card style ={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginBottom : "1rem"}}>
      <Card.Body>
        <div></div>
        <div>{chat.chatName}</div>
        </Card.Body>
    </Card>
  );
};

export default ChatListItem;
