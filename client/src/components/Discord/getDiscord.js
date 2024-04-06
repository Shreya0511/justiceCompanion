// Code to fetch discord data from the server
import getCookies from "../../hooks/getCookies";

const fetchDiscord = async () => {
	// console.log("fecthing");
	try {
		const response = await fetch("http://localhost:5001/api/v1/discord", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${getCookies("jwt")}`,
			},
		});
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		// console.log("fetch data", data);
		return data;
	} catch (error) {
		console.error("There was a problem with the fetch operation:", error);
		throw error; // rethrow the error to be caught by the calling code
	}
};

export default fetchDiscord;
