import React from "react";
import { AuthData } from "../../services/AuthService";
import bootstrap from "bootstrap";
import SideDrawer from "../../components/miscellaneous/SideDrawer";
import MyGroupChats from "../../components/miscellaneous/MyGroupChats";
import ChatBox from "../../components/miscellaneous/ChatBox";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileNavbar from "../../components/ProfileNavbar";

function QuickFixCourt() {
	const { user } = AuthData();
	const [fetchAgain, setFetchAgain] = useState();

	return (
		<>
			{/* <div style={{ paddingBottom: "0.5rem", position: "relative" }}> */}
			<Navbar />
			{/* </div> */}
			<div
				style={{
					width: "100%",
					height: "90%",
					backgroundColor: "rgb(63, 61, 61, 0.8)",
				}}
			>
				<div
					style={{
						// marginTop: "1.5rem",
						width: "100%",
						height: "100%",
						display: "flex",
						padding: "1rem",
						justifyContent: "center",
						boxSizing: "border-box",
					}}
				>
					<Row
						style={{
							display: "flex",
							width: "100%",
							height: "100%",
						}}
					>
						<div
							style={{
								width: "30%",
								height: "100%",
								flex: 2,
							}}
						>
							{" "}
							{user.isAuthenticated && (
								<MyGroupChats fetchAgain={fetchAgain} />
							)}
						</div>
						<Col
							style={{
								flex: 5,
								backgroundColor: "black",
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
						</Col>
					</Row>
				</div>
			</div>
		</>
	);
}

export default QuickFixCourt;
