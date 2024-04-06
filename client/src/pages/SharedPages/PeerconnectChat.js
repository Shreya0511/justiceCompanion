import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import usersChats from "../../utilities/GroupChats";
import { AuthData } from "../../services/AuthService";
import Navbar from "../../components/Navbar";
import getCookies from "../../hooks/getCookies";
import { getUser } from "../../utilities/getUser";
import io from "socket.io-client";
import ChatMsg from "../../components/Discord/ChatMsg";
import fetchDiscord from "../../components/Discord/getDiscord";

function PeerconnectChat() {
	const dummy = useRef(null);
	const { user } = AuthData();
	const [discordChat, setDiscordChat] = useState(null);
	const [message, setMessage] = useState("");
	const [pickerVisible, setPickerVisible] = useState(false);
	const [usersChats, setUsersChats] = useState([]);
	useEffect(() => {
		dummy.current.scrollIntoView();
	}, [usersChats, message]);

	const getMsgs = async () => {
		fetch("http://localhost:5001/api/v1/discord/getMessages", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				setUsersChats(data);
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
	};
	useEffect(() => {
		fetchDiscord().then((data) => {
			// console.log("data", data);
			setDiscordChat(data);
		});
		getMsgs();
	}, []);
	var socket;
	useEffect(() => {
		socket = io("http://localhost:5001");
		socket.emit("setup", {
			_id: JSON.parse(user.user)._id,
		});
		socket.emit("join discord");
		socket.on("message received", (newmsgRec) =>
			handleNewMessageReceived(newmsgRec)
		);
		return () => {
			socket.disconnect();
		};
	}, []);
	const handleNewMessageReceived = async (newmsgRec) => {
		await getUser(newmsgRec.sender)
			.then((data) => {
				newmsgRec.sender = data;
			})
			.then(() => {
				getMsgs();
			});
	};

	const handleNewMessage = async (newMessageReceived) => {
		console.log("Message Received");
		newMessageReceived.chat = await fetchDiscord();
		console.log("after everything", newMessageReceived);
		const socket = io("http://localhost:5001");
		socket.emit("new message", newMessageReceived);
		getMsgs();
	};
	const submitForm = async () => {
		await fetch("http://localhost:5001/api/v1/discord/sendMessage", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
			body: JSON.stringify({
				message: message,
				userId: JSON.parse(user.user)._id,
			}),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				handleNewMessage(data);
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
		setMessage("");
	};

	function press(event) {
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			submitForm();
		}
	}
	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setMessage(message + emoji);
	};

	const chat = (index) => {
		const chatMsg = usersChats[index];
		const sender = chatMsg.sender;
		if (!sender) return null;
		// console.log("sender", sender, "user", JSON.parse(user.user)._id);
		if (sender._id === JSON.parse(user.user)._id) {
			// console.log("sender", sender, "user", JSON.parse(user.user)._id);
			return <ChatMsg key={index} chatMsg={chatMsg} position="right" />;
		} else {
			// console.log("sender", sender, "user", user.user);
			return <ChatMsg key={index} chatMsg={chatMsg} position="left" />;
		}
	};

	const chats = () => {
		var html = [];
		for (let i = 0; i < usersChats.length; i++) {
			html.push(chat(i));
		}
		return html;
	};

	return (
		<>
			{pickerVisible && (
				<div className="emoji-picker-dialog">
					<Picker data={data} onEmojiSelect={addEmoji} />
				</div>
			)}
			<div className="bot-container">
				<div className="bot-message-container">
					{chats()}
					<div ref={dummy} />
				</div>
			</div>
			<div className="chat-text-box">
				<div className="emoji-icon">
					<FontAwesomeIcon
						icon={faSmile}
						className="emoji-icon-icon"
						onClick={() => setPickerVisible(!pickerVisible)}
					/>
				</div>
				<div className="chat-text-box-input-container">
					<div className="chat-input-box">
						<textarea
							id="chat-input-text"
							className="chat-input"
							rows="2"
							placeholder="Type here"
							onKeyDown={(e) => press(e)}
							onChange={(e) => setMessage(e.target.value)}
							value={message}
						></textarea>
					</div>
				</div>
				<div className="emoji-icon" onClick={() => submitForm()}>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>
		</>
	);
}

export default PeerconnectChat;
