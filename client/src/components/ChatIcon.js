import { faBars, faRocketchat } from "@fortawesome/free-brands-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import img from "../assets/bot-icon.svg";

function ChatIcon() {
	const navigate = useNavigate();
	const navigateToChat = () => {
		navigate("/chat-bot");
	};
	return (
		<div
			style={{ margin: "0px" }}
			className="chat-bot-icon-container"
			onClick={navigateToChat}
		>
			{/* <FontAwesomeIcon
				icon={faComment}
				className="chat-icon"
				onClick={navigateToChat}
			/> */}
			<img src={img} alt="chat-bot-icon" className="chat-icon" />
		</div>
	);
}

export default ChatIcon;
