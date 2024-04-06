import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
// import ProfileSidebar from "../../../components/ProfileSidebar";
// import Figure from "react-bootstrap/Figure";

// import { AuthData } from "../../../services/AuthService";
// import { createContext, useContext, useEffect, useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar";
import ImageContainer from "../../../components/ImageContainer";
import UserInfo from "../../../components/UserInfo";

const ProfileDashboard = () => {
	// const { user, setShowSidebar } = AuthData();

	return (
		<div
			style={{
				backgroundColor: "",
				width: "100vw",
				padding : "0px"
			}}
		>
			<Container
				style={{
					overflow: "hiding",
					backgroundColor: "",
					height: "100%",
					width : "100%",
					margin: "0px",
				}}
			>
				<Row style ={{height : "100%", width : "100%"}}>
					<Col
						style={{
							backgroundColor: "black",
							margin: "0px",
							height: "100vh",
						}}
					>
						<Row style={{}}>
							{" "}
							<ProfileNavbar />
						</Row>
						<div style={{ paddingRight: "0rem" }}>
							<Row
								style={{
									display: "flex",
									paddingLeft: "1rem",
									margin: "auto",
									marginTop: "1rem",
									fontSize: "1.5rem",
									color: "#dda676",
								}}
							>
								{" "}
								user profile{" "}
							</Row>
							<Row
								style={{
									paddingLeft: "0rem",
									display: "flex",
									paddingRight: "0rem",
									justifyContent: "space-around",
								}}
							>
								<Col style={{ flex: "1", marginLeft: "1rem" }}>
									{" "}
									<ImageContainer />{" "}
								</Col>
								<Col
									style={{
										marginLeft: "0px",
										flex: "3",
										marginRight: "7.5rem",
									}}
								>
									{" "}
									<UserInfo />{" "}
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default ProfileDashboard;
