import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	faCaretDown,
	faFilter,
	faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/FindLawyer.css";
import { AuthData } from "../../services/AuthService";
import Navbar from "../../components/Navbar";
import LawyerDetails from "../../components/LawyerDetails";
import ProfileImg from "../../components/ProfileImg";
import "../../styles/RequestsPage.css";
// import Footer from "../../components/Dashboard/Footer";
// import requests from "../assets/requests";
function FindLawyer() {
	const [lawyers, setLawyers] = useState([]);
	const [numLawyers, setNumLawyers] = useState(-1);
	const navigate = useNavigate();
	useEffect(() => {
		const fetchLawyers = async () => {
			const response = await fetch(
				"http://127.0.0.1:5001/api/v1/users/getLawyers",
				{
					method: "get",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
					setLawyers(data);
					setNumLawyers(data.length);
				});
		};
		fetchLawyers();
	}, []);

	const { user } = AuthData();
	// const [searchInput, setSearchInput] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	// const handleSearch = (e) => {
	// 	setSearchInput(e.target.value);
	// };

	// const submitForm = () => {
	// 	console.log(searchInput);
	// 	//handle search
	// 	setSearchInput("");
	// };

	const [requests, setRequests] = useState([]);

	const getAllRequests = async () => {
		console.log(user.user);
		console.log("calling", JSON.parse(user.user)._id);
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/userRequests/" +
				JSON.parse(user.user)._id,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log("response", response);
		if (response.ok) {
			const data = await response.json();
			console.log("Requests:", data);
			setRequests(data);
		}
	};

	useEffect(() => {
		getAllRequests();
	}, []);

	const sendRequest = async (index, type) => {
		const lawyer = lawyers[index];
		console.log("ids", JSON.parse(user.user)._id, lawyer._id);
		let requestData = {
			userId: JSON.parse(user.user)._id,
			lawyerId: lawyer._id,
			requestType: type,
		};
		try {
			const response = await fetch(
				"http://127.0.0.1:5001/api/v1/requests/createRequest",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(requestData),
				}
			);
			if (!response.ok) {
				console.log(response.message);
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("Request sent:", data);
		} catch (error) {
			console.error("Error:", error);
		}
		getAllRequests();
	};

	const sendChatRequest = async (index) => {
		sendRequest(index, "Chat");
	};
	const sendHireRequest = async (index) => {
		sendRequest(index, "Hire");
	};

	const handleDeleteRequest = async (index, type) => {
		const lawyer = lawyers[index];
		const request = requests.filter(
			(request) =>
				request.user_id === JSON.parse(user.user)._id &&
				request.lawyer_id === lawyer._id &&
				request.request_type === type &&
				request.pending === true
		)[0];
		try {
			const response = await fetch(
				`http://127.0.0.1:5001/api/v1/requests/deleteRequest/${request._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			console.log("Request deleted:", request._id);
		} catch (error) {
			console.error("Error:", error);
		}
		getAllRequests();
	};
	const deleteChatRequest = async (index) => {
		handleDeleteRequest(index, "Chat");
	};
	const deleteHireRequest = async (index) => {
		handleDeleteRequest(index, "Hire");
	};

	const findMatchingRequest = (index, type) => {
		const lawyer = lawyers[index];
		let reqStatus = {};
		if (requests == null) return reqStatus;
		let request = requests.filter(
			(request) =>
				request.user_id === JSON.parse(user.user)._id &&
				request.lawyer_id === lawyer._id &&
				request.request_type === type &&
				request.pending === true
		)[0];
		let req = requests.filter(
			(request) =>
				request.user_id === JSON.parse(user.user)._id &&
				request.lawyer_id === lawyer._id &&
				request.request_type === type &&
				request.pending === false
		)[0];
		if (request) {
			reqStatus = {
				requested: true,
				pending: true,
			};
		} else if (req) {
			reqStatus = {
				requested: true,
				pending: false,
				accepted: req.accepted,
			};
		} else {
			reqStatus = {
				requested: false,
				pending: false,
			};
		}

		return reqStatus;
	};

	const handleNavigate = (type, index) => {
		if (type === "Chat") {
			navigate("/chat");
		}
	};
	const renderMatchingRequest = (index, type) => {
		const matchingRequest = findMatchingRequest(index, type);
		const deleteFunction =
			type === "Chat" ? deleteChatRequest : deleteHireRequest;
		const sendFunction =
			type === "Chat" ? sendChatRequest : sendHireRequest;
		return matchingRequest.requested ? (
			<>
				{matchingRequest.pending ? (
					<button
						className="request-button cancel-request-button"
						onClick={() => deleteFunction(index)}
					>
						Cancel {type} Request
					</button>
				) : (
					<>
						{matchingRequest.accepted ? (
							<button
								className="request-button request-acc-button"
								onClick={() => handleNavigate(type, index)}
							>
								{type === "Chat"
									? "Start Chatting"
									: "Hire Request Accepted"}
							</button>
						) : (
							<button
								className="request-button request-dec-button"
								disabled={true}
							>
								{type} Requested Declined
							</button>
						)}
					</>
				)}
			</>
		) : (
			<button
				className="request-button"
				onClick={() => sendFunction(index)}
			>
				Send {type} Request
			</button>
		);
	};

	return (
		<>
			<Navbar />
			<div className="find-lawyer-body">
				<div
					className="title-find-lawyer"
					style={{
						fontSize: "2rem",
						margin: "auto",
						width: "100%",
						textAlign: "center",
					}}
				>
					<span className="initial login-txt">F</span>
					<span className="login-txt">ind </span>
					<span className="initial login-txt">L</span>
					<span className="login-txt">awyer</span>
				</div>
				<div className="search-section">
					{/* <div className="filter-text"></div> */}
					<div className="filter">
						<FontAwesomeIcon
							icon={faFilter}
							className="filter-icon"
							onClick={() => setFormVisible(!formVisible)}
						/>
						<div
							className={
								formVisible ? "filter-form" : "hide-element"
							}
						></div>
					</div>
				</div>

				<div className="search-results">
					{numLawyers === -1 && (
						<div className="Loading-container">Loading...</div>
					)}
					{numLawyers === 0 ? (
						<h1>No lawyers found</h1>
					) : (
						lawyers.map((lawyer, index) => {
							return (
								<div className="lawyer-card" key={index}>
									<div className="lawyer-img-container">
										<ProfileImg person={lawyer} />
									</div>
									<div className="lawyer-info">
										<div className="lawyer-details-wrapper">
											<LawyerDetails lawyer={lawyer} />
										</div>
										<div className="lawyer-buttons">
											{renderMatchingRequest(
												index,
												"Chat"
											)}
											{renderMatchingRequest(
												index,
												"Hire"
											)}
										</div>
									</div>
									{lawyer.takesProBono && (
										<div className="free-tag">Pro Bono</div>
									)}
								</div>
							);
						})
					)}
				</div>
			</div>
		</>
	);
}

export default FindLawyer;
