import React from "react";
import { AuthData } from "../../services/AuthService";
// import bootstrap from "bootstrap";
// import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyChats from "../../components/miscellaneous/MyChats";
import ChatBox from "../../components/miscellaneous/ChatBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileNavbar from "../../components/ProfileNavbar";

function ChatPage() {
	const { user } = AuthData();
	const [fetchAgain, setFetchAgain] = useState();

	return (
		<>
			<Navbar />
			{/* <ProfileNavbar/> */}
			<div
				style={{
					width: "100%",
					height: "92%",
					backgroundColor: "rgb(63, 61, 61, 0.8)",
					// backgroundColor: "pink",
					padding: "1.5rem",
					// paddingTop : "0px",
				}}
			>
				<div
					style={{
						width: "100%",
						height: "100%",
						// backgroundColor: "blue",
					}}
				>
					<div
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
							// backgroundColor: "purple",
						}}
					>
						<div
							style={{
								width: "30%",
								height: "100%",
								minWidth: "300px",
								// backgroundColor: "red",
								flex: 2,
								margin: "0 5px",
								//   borderRadius:"2rem"
							}}
						>
							{" "}
							{user.isAuthenticated && (
								<MyChats fetchAgain={fetchAgain} />
							)}
						</div>
						<div
							style={{
								width: "70%",
								height: "100%",
								// flex: 5,
								backgroundColor: "black",
								// backgroundColor: "yellow",
								borderRadius: "1rem",
							}}
						>
							{" "}
							{user.isAuthenticated && (
								<ChatBox
									fetchAgain={fetchAgain}
									setFetchAgain={setFetchAgain}
								/>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ChatPage;
