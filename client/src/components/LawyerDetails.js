import React from "react";

function LawyerDetails({lawyer}) {
	return (
		<>
			<div className="lawyer-details">
				<div className="lawyer-det">
					<span className="det"> Name: </span>
					{lawyer.name}
				</div>
				<div className="lawyer-det">
					<span className="det"> Type: </span>
					{lawyer.tag}
				</div>
				<div className="lawyer-det">
					<span className="det">Number of cases won: </span>
					{lawyer.countWonCases}
				</div>
				<div className="lawyer-det">
					<span className="det">About: </span>
					{lawyer.description}
					Lorem ipsum dolor sit amet. Id perspiciatis repellat et amet
					magnam qui libero voluptatem ut provident illo et reiciendis
					ratione aut ipsam necessitatibus est odio autem! Est
					aspernatur galisum et nisi dolorum cum tempore deleniti.
				</div>
			</div>
			<div className="lawyer-details">
				<div className="lawyer-det">
					<span className="det">Age: </span>
					{lawyer.age}
				</div>
				<div className="lawyer-det">
					<span className="det">No. of cases: </span>
					{lawyer.countPastCases}
				</div>
				<div className="lawyer-det">
					<span className="det">Experience: </span>
					{lawyer.experience}
				</div>
				<div className="lawyer-det">
					{lawyer.city}
					{lawyer.city ? ", " : " "}
					{lawyer.state}
					{lawyer.state ? "," : " "}
					{lawyer.country}
				</div>
			</div>
		</>
	);
}

export default LawyerDetails;
