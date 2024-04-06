import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Nav from "react-bootstrap/Nav";
// import Tab from "react-bootstrap/Tab";
// import ProfileSidebar from "../../../components/ProfileSidebar";
import Figure from "react-bootstrap/Figure";

import { AuthData } from "../../../services/AuthService";
import { createContext, useContext, useEffect, useState } from "react";
import ProfileNavbar from "../../../components/ProfileNavbar";
// import ImageContainer from "../../../components/ImageContainer";
// import UserInfo from "../../../components/UserInfo";
import ChangePasswordFrom from "../../../components/ChangePasswordFrom";

const ChangePassword = () => {
	const { user, setShowSidebar } = AuthData();

	return (
		<div>
			<div
				style={{
					backgroundColor: "",
					width: "100vw",
					boxsizing: "border-box",
				}}
			>
				<div
					style={{
						overflow: "hiding",
						backgroundColor: "",
						height: "100%",
						width: "100vw",
						margin: "0px",
					}}
				>
					<Row>
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
							<div style={{ paddingRight: "5rem" }}>
								<Row
									style={{
										display: "flex",
										paddingLeft: "1.1rem",
										margin: "auto",
										marginTop: "1rem",
										fontSize: "1.5rem",
										color: "#dda676",
									}}
								>
									{" "}
									Change Password{" "}
								</Row>
								<Row
									style={{
										paddingLeft: "0rem",
										display: "flex",
										paddingRight: "2rem",
										justifyContent: "space-around",
									}}
								>
									<Col
										style={{
											marginLeft: "0px",
											flex: "1",
											marginRight: "7.5rem",
											paddingLeft: "2rem",
										}}
									>
										{" "}
										<ChangePasswordFrom />{" "}
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
