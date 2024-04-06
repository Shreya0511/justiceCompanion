import React from "react";
import "../../styles/Discord.css";
import { AuthData } from "../../services/AuthService";
import getCookies from "../../hooks/getCookies";

function AddtoDiscord() {
	const { user } = AuthData();
	const userId = JSON.parse(user.user)._id;
	const addToDiscord = async () => {
		fetch(`http://localhost:5001/api/v1/discord/add/${userId}`, {
			method: "PUT",
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
				console.log(data);
				window.location.reload();
			})
			.catch((error) => {
				console.error(
					"There was a problem with the fetch operation:",
					error
				);
			});
	};
	return (
		<>
			<div className="discord-disabled-wrapper">
				<button
					className="discord-add-but"
					onClick={addToDiscord}
				>
					Click to get access to the Discussion Forum
				</button>
			</div>
		</>
	);
}

export default AddtoDiscord;
