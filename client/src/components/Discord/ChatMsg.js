import React from "react";

function ChatMsg(props) {
	const { chatMsg, position } = props;
	// console.log(chatMsg.sender.image);
	if (position === "left") {
		return (
			<div className="chat-container-left">
				<div className={"chat-message---"}>
					<div className="chat-icon-container">
						<img
							src={`http://localhost:5001/uploads/${chatMsg.sender.image}`}
							alt="chat-icon"
							className="chat-icon--"
						/>
					</div>

					<div className="chat-msg-wrapper-left">
						<div className="chat-message message-txt--left">
							<div className="message-details">
								<div className="message-details-name">
									{chatMsg.sender.name}
								</div>
								<div className="message-details-time">
									{chatMsg.createdAt}
								</div>
							</div>
							<p className="msg">{chatMsg.content}</p>
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="chat-container-right">
				<div className={"chat-message---"}>
					<div className="chat-msg-wrapper-right">
						<div className="chat-message message-txt--right">
							<div className="message-details">
								<div className="message-details-name">
									{chatMsg.sender.name}
								</div>
								<div className="message-details-time">
									{chatMsg.createdAt}
								</div>
							</div>
							<p className="msg">{chatMsg.content}</p>
						</div>
					</div>
					<div className="chat-icon-container">
						<img
							src={`http://localhost:5001/uploads/${chatMsg.sender.image}`}
							alt="chat-icon"
							className="chat-icon--"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ChatMsg;
