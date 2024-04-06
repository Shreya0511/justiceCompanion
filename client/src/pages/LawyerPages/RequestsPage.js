import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { AuthData } from "../../services/AuthService";
import "../../styles/RequestsPage.css";
import { getUser } from "../../utilities/getUser";
import getCookies from "../../hooks/getCookies";

function RequestsPage() {
	const [searchInput, setSearchInput] = useState("");
	const [formVisible, setFormVisible] = useState(false);
	const handleSearch = (e) => {
		setSearchInput(e.target.value);
	};

	const submitForm = () => {
		console.log(searchInput);
		setSearchInput("");
	};
	const { user } = AuthData();
	const [requests, setRequests] = useState([]);
	const [numRequests, setNumRequests] = useState(-1);
	const getAllRequests = async () => {
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/lawyerRequests/" +
				JSON.parse(user.user)._id,
			{
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setRequests(data);
				if (data) setNumRequests(data.length);
				else setNumRequests(0);
			});
	};
	useEffect(() => {
		getAllRequests();
	}, []);

	const [chatRequests, setChatRequests] = useState([]);
	const getTypeRequests = async (type) => {
		let typeReq = [];
		if (!requests) return typeReq;
		for (let i = 0; i < requests.length; i++) {
			if (requests[i].pending === false) continue;
			if (requests[i].request_type !== type) continue;
			let user = await getUser(requests[i].user_id);
			let req = {
				_id: requests[i]._id,
				name: user.name,
				email: user.email,
				image: user.image,
				type: requests[i].request_type,
			};

			typeReq.push(req);
		}
		return typeReq;
	};
	const [deletedRequests, setDeletedRequests] = useState([]);
	const getDeletedRequests = async () => {
		let deletedReq = [];
		if (!requests) return deletedReq;
		for (let i = 0; i < requests.length; i++) {
			if (requests[i].pending === true) continue;
			if (requests[i].accepted === true) continue;
			let user = await getUser(requests[i].user_id);
			let req = {
				_id: requests[i]._id,
				name: user.name,
				email: user.email,
				image: user.image,
				type: requests[i].request_type,
			};
			deletedReq.push(req);
		}
		setDeletedRequests(deletedReq);
	};
	const getChatRequests = async () => {
		let chatReq = await getTypeRequests("Chat");
		setChatRequests(chatReq);
	};
	const [hireRequests, setHireRequests] = useState([]);
	const getHireRequests = async () => {
		let hireReq = await getTypeRequests("Hire");
		setHireRequests(hireReq);
	};
	useEffect(() => {
		getChatRequests();
		getHireRequests();
		getDeletedRequests();
	}, [requests]);

	const acceptRequest = async (id) => {
		console.log("acp:", id);
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/acceptRequest/" + id,
			{
				method: "PATCH",
				headers: {
					authorization: `Bearer ${getCookies("jwt")}`,
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		getAllRequests();
	};
	const rejectRequest = async (id) => {
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/rejectRequest/" + id,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		getAllRequests();
	};

	const deleteRequest = async (id) => {
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/deleteRequest/" + id,
			{
				method: "delete",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		getAllRequests();
	};

	const revokeRequest = async (id) => {
		const response = await fetch(
			"http://127.0.0.1:5001/api/v1/requests/revokeRequest/" + id,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
		getAllRequests();
	};

	const renderComponent = (dataArr, title, del) => {
		return (
			<div className="requests-container">
				<div className="requests-tile-header">{title}</div>
				{dataArr.length === 0 && (
					<div className="requests-tile-body-desc">No {title}</div>
				)}
				{dataArr && (
					<div className="requests-tile-body">
						{dataArr.map((data, index) => {
							return (
								<div className="request-request" key={index}>
									<div className="request-request-img">
										<img
											src={data.image}
											alt="profile"
											className="request-request-img-img"
										/>
									</div>
									<div className="request-request-details">
										<div className="request-user-name">
											{data.name}
										</div>
										<div className="request-user-email">
											{data.email}
										</div>
										<div className="request-buttons">
											<button
												className="request-button-accept"
												onClick={() => {
													del
														? revokeRequest(
																data._id
														  )
														: acceptRequest(
																data._id
														  );
												}}
											>
												{del
													? `Revoke ${data.type} request`
													: "Accept"}
											</button>
											<button
												className="request-button-decline"
												onClick={() => {
													del
														? deleteRequest(
																data._id
														  )
														: rejectRequest(
																data._id
														  );
												}}
											>
												{del
													? "Delete permanently"
													: "Reject"}
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		);
	};

	return (
		<>
			<Navbar />
			<div className="requests-page-body">
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
				<div className="request-search-results">
					{numRequests === -1 && (
						<div className="Loading-container">Loading...</div>
					)}
					{numRequests !== -1 &&
						renderComponent(chatRequests, "Chat Requests", false)}
					{numRequests !== -1 &&
						renderComponent(hireRequests, "Hire Requests", false)}
					{numRequests !== -1 &&
						renderComponent(
							deletedRequests,
							"Rejected Requests",
							true
						)}
				</div>
			</div>
		</>
	);
}

export default RequestsPage;
