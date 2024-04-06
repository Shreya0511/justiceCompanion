import React, { useState, useEffect, useRef } from "react";
import "../../styles/ChatBot.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmile } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import botChats from "../../utilities/BotChats";
// import MarkdownIt from "markdown-it";
import Navbar from "../../components/Navbar";
// import img from "../../assets/bot-icon.svg";
// import Markdown from "markdown-to-jsx";
import Markdown from "react-markdown";
// import Footer from "../../components/Dashboard/Footer";
import { AuthData } from "../../services/AuthService";
// const md = new MarkdownIt();
function ChatBot() {
	const { user } = AuthData();
	const dummy = useRef(null);
	const [message, setMessage] = useState("");
	const [isInputDisabled, setIsInputDisabled] = useState(false);
	const [pickerVisible, setPickerVisible] = useState(false);
	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [botChats, message]);
	const [loading, setLoading] = useState(false);
	async function submitForm() {
		setLoading(true);
		botChats.user.messages.push(message);
		setIsInputDisabled(true);

		setMessage("");

		let userMessage = {
			userInput: message,
		};

		const response = await fetch("http://localhost:5500/user-input", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userMessage),
		})
			.then((response) => response.json())
			.then((data) => {
				// const formattedResponse = md.render(data.response);
				// console.log("response" + data.response);

				// console.log("formattedResponse" + formattedResponse);
				botChats.bot.messages.push(data.response);
				// botChats.bot.messages.push(data.response);
			});
		setLoading(false);
		setMessage("");
		setIsInputDisabled(false);
	}

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

	// const renderContent = (index) => {
	// 	const content = botChats.bot.messages[index];
	// 	return content;
	// };
	const chat = (entity, index) => {
		// console.log("eee", botChats[entity]);
		return (
			<div>
				<div className={entity + "-message---"}>
					{entity === "user" && (
						<div className="bot-message message-txt">
							<p>{botChats[entity].messages[index]}</p>
						</div>
					)}
					<div className="bot-icon-container">
						{console.log("jspn",JSON.parse(user.user).image)}
						<img
							src={
								entity === "user"
									? `http://localhost:5001/uploads/${JSON.parse(user.user).image}`
									: botChats[entity].icon
							}
							alt="bot-icon"
							className="bot-icon--"
							style={{
								backgroundColor: "white",
							}}
						/>
					</div>
					{entity === "bot" && (
						<div className="bot-message message-txt--">
							<Markdown>
								{botChats[entity].messages[index]}
							</Markdown>
						</div>
					)}
				</div>
			</div>
		);
	};

	const chats = () => {
		var html = [];
		for (let i = 0; i < botChats.user.messages.length; i++) {
			html.push(chat("user", i));
			html.push(chat("bot", i));
			// console.log(typingDiv());
			html.push(<br />);
			// html.push(<hr/>);
		}
		return html;
	};

	return (
		<div className="chat-bot-wrapper">
			<Navbar />
			{pickerVisible && (
				<div className="emoji-picker-dialog">
					<Picker data={data} onEmojiSelect={addEmoji} />
				</div>
			)}
			<div className="bot-container">
				<div className="bot-message-container">
					{chats()}
					<div ref={dummy} />
					{loading && (
						<div className="typing-indicator">
							<span className="typing-dot"></span>
							<span className="typing-dot"></span>
							<span className="typing-dot"></span>
						</div>
					)}
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
							disabled={isInputDisabled}
						></textarea>
					</div>
				</div>
				<div className="emoji-icon" onClick={() => submitForm()}>
					<FontAwesomeIcon icon={faArrowRight} />
				</div>
			</div>
		</div>
	);
}

export default ChatBot;
