import React from "react";
import Navbar from "../../components/Navbar";
import TDCard from "../../components/TrialDetainees/TDCard";
import data from "../../components/TrialDetainees/TrialDetaineesContent.js";

function TrialDetainees() {
	// console.log(data);
	return (
		<>
			<Navbar />
			<div className="prepPitchWrapper">
				{data.map((item, index) => {
					return (
						<TDCard
							key={index}
							desc={item.desc}
							list={item.list}
							title={item.title}
						/>
					);
				})}
			</div>
		</>
	);
}

export default TrialDetainees;
