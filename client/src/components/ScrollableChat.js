import React from "react";
// import ScrollableFeed from "react-scrollable-feed";
import {
	isSameSender,
	isSameSenderMargin,
	isSameUser,
} from "../services/ChatLogics";
import { AuthData } from "../services/AuthService";
import Image from "react-bootstrap/Image";
import "../styles/ScrollableChat.css";
import { useRef, useEffect } from "react";

const ScrollableChat = ({ messages }) => {
	const { user, selectedChat } = AuthData();
	const dummy = useRef(null);
	useEffect(() => {
		dummy.current.scrollIntoView();
	}, []);
	return (
		<div className="messageBox">
			{messages &&
				messages.map((m, i) => (
					<div style={{ display: "flex" }} key={m._id}>
						{console.log("message", m)}
						{isSameSender(
							messages,
							m,
							i,
							JSON.parse(user.user)._id
						)}
						{/* // isLastMessage(messages, i, JSON.parse(user.user)._id)} */}

						{JSON.parse(user.user)._id !== m.sender._id ? (
							<div
								className="imageHolder"
								style={{
									marginTop: `${
										isSameUser(
											messages,
											m,
											i,
											JSON.parse(user.user)._id
										)
											? "1rem"
											: "2rem"
									}`,
								}}
							>
								<Image
									style={{
										height: "2.5rem",
										width: "2.5rem",
									}}
									src={
										m.sender.image ===
										"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
											? m.sender.image
											: `http://localhost:5001/uploads/${m.sender.image}`
									}
									roundedCircle
								/>
							</div>
						) : (
							" "
						)}
						<div
							style={{
								backgroundColor: `${
									m.sender._id === JSON.parse(user.user)._id
										? "var(--primary-brown)"
										: "#6c686d"
								}`,
								borderRadius: "20px",
								padding: "5px 15px",
								maxWidth: "75%",
								height: "auto",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",

								marginLeft: isSameSenderMargin(
									messages,
									m,
									i,
									JSON.parse(user.user)._id
								),
								marginTop: isSameUser(
									messages,
									m,
									i,
									JSON.parse(user.user)._id
								)
									? "1rem"
									: "2rem",
							}}
						>
							<div
								style={{
									width: "100%",
									height: "100%",
									wordWrap: "break-word",
								}}
							>
								{m.content}
							</div>
						</div>
					</div>
				))}
			{/* dummy here */}
			<div ref={dummy} />
		</div>
	);
};

export default ScrollableChat;
