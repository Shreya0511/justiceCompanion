import React from "react";

function LawyerDetails({lawyer}) {
	return (
		<>
			<div className="lawyer-details" style ={{display : "flex", flexDirection : "row", height : "8rem", width : "100%"}}>
				<div style ={{flex : "4", display : "flex", flexDirection: "column", alignItems : "flex-start"}}>
				<div className="lawyer-det">
					<span className="det"> Name: </span>
					{lawyer.name}
				</div>
				<div className="lawyer-det">
					<span className="det"> Type: </span>
					{lawyer.extraFields ? lawyer.extraFields.typeOfLawyer : ""}
				</div>
				<div className="lawyer-det">
					<span className="det">Number of cases won: </span>
					{lawyer.extraFields? lawyer.extraFields.numberOfCasesWon: ""}
				</div>
				<div className="lawyer-det">
					<span className="det">About: </span>
					{lawyer.extraFields? lawyer.extraFields.about: ""}
			</div></div>
			<div style ={{flex : "3"}}>
				<div className="lawyer-det">
					<span className="det">Age: </span>
					{lawyer.extraFields? lawyer.extraFields.age : ""}
				</div>
				<div className="lawyer-det">
					<span className="det">No. of cases: </span>
					{lawyer.extraFields? lawyer.extraFields.numberOfCasesFought : ""}
				</div>
				<div className="lawyer-det">
					<span className="det">Experience: </span>
					{lawyer.extraFields? lawyer.extraFields.experienceInYears: ""}
				</div>
				<div className="lawyer-det">
					<span className="det">Fees Charged: </span>
					{lawyer.extraFields? `${lawyer.extraFields.feesCharged} rs` : ""}
				</div>
				</div>
			</div>
		</>
	);
}

export default LawyerDetails;
