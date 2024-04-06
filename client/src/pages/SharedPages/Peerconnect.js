import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { AuthData } from "../../services/AuthService";
import getCookies from "../../hooks/getCookies";
import PeerconnectChat from "./PeerconnectChat";
import AddtoDiscord from "../../components/Discord/AddtoDiscord";
function Peerconnect() {
	const { user } = AuthData();
	const [hasAccess, setHasAccess] = useState(false);
	const checkAccess = async () => {
		const userId = JSON.parse(user.user)._id;
		fetch(`http://localhost:5001/api/v1/discord/hasAccess/${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// console.log(data);
				setHasAccess(data.hasAccess);
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
	};
	useEffect(() => {
		checkAccess();
	}, [hasAccess, checkAccess]);

	return (
		<>
			<Navbar />

			<div className="chat-bot-wrapper">
				<div className="title-bar">Peerconnectx</div>
				{hasAccess ? <PeerconnectChat /> : <AddtoDiscord />}
			</div>
		</>
	);
}

export default Peerconnect;
