import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthData } from "../../../services/AuthService";
import ProfileNavbar from "../../../components/ProfileNavbar";
import ImageEditController from "../../../components/ImageEditController";
import UserInfoEdit from "../../../components/UserInfoEdit";

const EditDetails = () => {
	const { user, setShowSidebar } = AuthData();

	return (
		<div
			style={{
				backgroundColor: "red",
				width : "100%"
			}}
		>
			<div
				style={{
					overflow: "auto",
					backgroundColor: "",
					height: "100%",
					margin: "0px",
					width: "100vw",
					boxsizing: "border-box",

				}}
			>
				<Row>
					<Col
						style={{
							backgroundColor: "black",
							margin: "0px",
							// height: "100vh",
							width : "100%"
						}}
					>
						<Row>
							{" "}
							<ProfileNavbar />
						</Row>
						<Row
							style={{
								display: "flex",
								paddingLeft: "2rem",
								margin: "auto",
								marginTop: "1rem",
								fontSize: "1.5rem",
								color: "#dda676",
							}}
						>
							{" "}
							Edit Details{" "}
						</Row>
						<Row
							style={{
								paddingLeft: "2rem",
								display: "flex",
								marginRight: "7rem",
							}}
						>
							<Col style={{ flex: "1", }}>
								{" "}
								<ImageEditController />{" "}
							</Col>
							<Col
								style={{
									marginLeft: "0px",
									flex: "3",
									marginRight: "7rem",
								}}
							>
								{" "}
								<UserInfoEdit />
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default EditDetails;
