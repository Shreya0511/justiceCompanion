import React from "react";
import { useState } from "react";
import { AuthData } from "../../services/AuthService";
import getCookies from "../../hooks/getCookies";
import axios from "axios";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ChatLoading from "./ChatLoading";
import Stack from "react-bootstrap/Stack";
import { getSender } from "../../services/ChatLogics";
import GroupChatModel from "./GroupChatModel";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import GroupStackItem from "../userAvator/GroupStackItem";
import "../../styles/Mychats.css";
import SideDrawer from "./SideDrawer";

const MyGroupChats = ({ fetchAgain }) => {
	const { user, selectedChat, setSelectedChat, chats, setChats } = AuthData();
	const [loggedUser, setLoggedUser] = useState();

	const fetchChats = async () => {
		try {
			const config = {
				headers: {
					authorization: `Bearer ${getCookies("jwt")}`,
				},
			};

			const { data } = await axios.get(
				"http://127.0.0.1:5001/api/v1/chats",
				config
			);
			setChats(data);
		} catch (err) {
			alert("Error loading chats!!");
			console.log("ERROR", err);
		}
	};

	useEffect(() => {
		setLoggedUser(user.user);
		fetchChats();
		setSelectedChat(false);
	}, [fetchAgain]);

	return (
		<div
			className="mainMyChats"
			style={{
				backgroundColor: "black",
				borderRadius: "1rem",
				overflowX: "hidden",
				width: "100%",
				height: "100%",
			}}
		>
			<Container
				className="p-3 mb-2 text-white"
				style={{
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Row
					style={{
						width: "100%",
						display: "flex",
						flexDirection: "column",
						padding: "0.8rem",
						paddingTop: "0.5rem",
					}}
				>
					<Col style={{}}>
						<SideDrawer />
					</Col>

					{/* <Col
            style={{marginTop: "1rem", fontWeight: "bold", color: "white", display : "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div style ={{backgroundColor : "#de9b6a",  padding : "0.7rem", borderRadius : "1.1rem"}}>
            + Create new room
            </div>
          </Col> */}
					{JSON.parse(user.user).role === "lawyer" ? (
						<Col>
							<GroupChatModel>
								<Col
									style={{
										width: "100%",
										marginTop: "1rem",
										fontWeight: "bold",
										color: "white",
										display: "flex",
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<div
										style={{
											backgroundColor: "#de9b6a",
											padding: "0.7rem",
											borderRadius: "1.1rem",
										}}
									>
										+ Create new room
									</div>
								</Col>{" "}
							</GroupChatModel>
						</Col>
					) : (
						<></>
					)}
				</Row>
				<Row style={{ width: "100%" }}>
					<Col style={{ marginTop: "1rem", width: "100%" }}>
						{chats.length > 0 ? (
							<Stack direction="vertical" gap={3}>
								{chats.map((chat) =>
									chat.isGroupChat &&
									chat.chatName !== "discord" ? (
										<GroupStackItem
											key={chat._id}
											setSelectedChat={setSelectedChat}
											chat={chat}
											selectedChat={selectedChat}
										/>
									) : (
										<> </>
									)
								)}
							</Stack>
						) : (
							<div
								style={{
									width: "100%",
									backgroundColor: "rgba(63, 61, 61, 0.8)",
									padding: "1rem",
									display: "flex",
									justifyContent: "center",
									alignContent: "center",
									borderRadius: "1rem",
								}}
							>
								Oops!! You have not been added to any chat
								room!! Please do ask your lawyer to do so.
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default MyGroupChats;
