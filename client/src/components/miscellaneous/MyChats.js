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
import UserStackItem from "../userAvator/UserStackItem";
import "../../styles/Mychats.css";

const MyChats = ({ fetchAgain }) => {
	const { user, selectedChat, setSelectedChat, chats, setChats } = AuthData();
	const [loggedUser, setLoggedUser] = useState();
	const [search, setSearch] = useState();
	const [searchResults, setSearchResults] = useState();

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

	const handleSearch = async (e) => {
		setSearch(e.target.value);

		if (e.key === "Enter") {
			try {
				const { data } = await axios.get(
					`http://127.0.0.1:5001/api/v1/users/getChats?search=${search}`
				);
				console.log("search value", data);
				setSearchResults(data);
			} catch (error) {
				alert("No Users Found!!");
				console.log(error);
			}
		}
	};

	return (
		<div
			className="mainMyChats"
			style={{
				display: "flex",
				flexDirection: "column",
				backgroundColor: "black",
				borderRadius: "1rem",
				overflowX: "hidden",
				height: "100%",
			}}
		>
			<Container
				className="p-3 mb-2 text-white"
				style={{ display: "flex", flexDirection: "column" }}
			>
				<Row
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "0.8rem",
						paddingTop: "0.5rem",
					}}
				>
					<Col style={{}}>
						<Form>
							<Form.Group
								className="mb-3"
								controlId="exampleForm.ControlInput1"
							>
								<Form.Control
									id="iconified"
									className="fontAwesome"
									placeholder="&#xF002; search chats"
									style={{ fontFamily: "Arial, FontAwesome" }}
									autoFocus
									onChange={handleSearch}
								/>
							</Form.Group>
						</Form>{" "}
					</Col>

					<Col
						style={{
							fontSize: "1.2rem",
							fontWeight: "bold",
							color: "#c29879",
						}}
					>
						Chats
					</Col>
					{/* <Col> */}
					{/* <GroupChatModel>
        <Button variant="info"> + Create Group Chat</Button>
        </GroupChatModel> */}
					{/* </Col> */}
				</Row>
				<Row>
					<Col>
						{searchResults ? (
							<Stack direction="vertical" gap={3}>
								{searchResults.map((chat) =>
									!chat.isGroupChat ? (
										<UserStackItem
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
							<></>
						)}
						{chats.length > 0 ? (
							<Stack direction="vertical" gap={3}>
								{chats.map((chat) =>
									!chat.isGroupChat ? (
										<UserStackItem
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
									backgroundColor: "rgba(63, 61, 61, 0.8)",
									padding: "1rem",
									display: "flex",
									justifyContent: "center",
									alignContent: "center",
									borderRadius: "1rem",
								}}
							>
								Oops!! No conversations to show..Do send
								connection requests to lawyers to start
								chatting.
							</div>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default MyChats;
