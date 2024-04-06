import React, { useEffect } from "react";
import Image from "react-bootstrap/Image";
import { AuthData } from "../../services/AuthService";
import { useState } from "react";
import "../../styles/UserStackItem.css";
import { getSender } from "../../services/ChatLogics";

const UserStackItem = ({ setSelectedChat, chat, selectedChat }) => {
  const { user } = AuthData();

  const handleTime = (chat) => {
    var createdAt = chat.updatedAt;
    var currDate = new Date().getTime();
    var date = new Date(createdAt).getTime();
    var total = (Math.floor((currDate - date)/1000))/3600;

    if(total < 1){
        var temp = total * 60;
         if(temp >= 1){
            return `${Math.floor(temp)} m`;
         }
         else{
            return `${Math.floor(temp) * 60}s`;
         }
    }

    else{
        return Math.floor(total) < 24 ? `${Math.floor(total)} h` : `${Math.floor(total/24)} d`
    }
 
    return total < 1 ? "now" : Math.floor(total); 
    // return (date.toLocaleString('en-GB', {day:'numeric', month: 'long',  year:'numeric'}));

  };

  return (
    <div
      className={selectedChat !== chat ? "inactive" : "active"}
      style={{ display: "flex", padding: "0.5rem", borderRadius: "1rem" }}
      onClick={() => setSelectedChat(chat)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "0.5rem",
          flex: 1,
        }}
      >
        <div>
          <Image
            style={{ height: "2.5rem", width: "2.5rem" }}
            // src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
            // src = {getSender(JSON.parse(user.user).name, selectedChat.users).image}
            src={
              getSender(JSON.parse(user.user).name, chat.users).image ===
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                ? getSender(JSON.parse(user.user).name, chat.users).image
                : `http://localhost:5001/uploads/${getSender(JSON.parse(user.user).name, chat.users).image}`
            }
            // src = {imageSrc(getSender(JSON.parse(user.user).name, selectedChat.users).image)}
            roundedCircle
          />
        </div>
      </div>
      <div style={{ flex: 3 }}>
        <div style={{fontSize : "1rem", color : "#eec7a0", fontWeight: "550" }}>{getSender(JSON.parse(user.user).name, chat.users).username}</div>
        <div
          style={{
            color: "white",
            height: "1.8rem",
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          {chat.latestMessage ? chat.latestMessage.content : " "}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          marginLeft: "4rem",
          flex: 2,
        }}
      >
        {handleTime(chat)}
      </div>
    </div>
  );
};

export default UserStackItem;
