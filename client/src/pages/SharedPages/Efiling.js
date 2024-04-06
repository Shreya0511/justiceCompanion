import React from "react";
import "../../styles/efilling.css";
import { Color } from "three";
import Navbar from "../../components/Navbar";
import { NavLink } from "react-router-dom";

function Efiling() {
	return (
		<>
			<Navbar />

			<div className="port">
				<div>
					<span id="det">What is E-Filling? </span>
					<div className="lawyer-card">
						E-Filing system is a complete end to end solution
						developed for online filing of plaints, written
						statements, replies and various applications related to
						cases. Both Civil and Criminal cases can be filed before
						any High Court or District Court of the country. It is
						designed in Bilingual (English and local language) to
						reach wider group covering advocates/litigants.
					</div>
					<div className="more">
						<div>
							<span id="det">Ditch endless court dates!</span>{" "}
							<div className="lawyer-card">
								{" "}
								<p>
									File your case online from home with ease.
									<br />
									Click{" "}
									<a href="https://filing.ecourts.gov.in/pdedev/">
										here
									</a>{" "}
									to apply.
									<br />
									Want to know required docs or confused about
									how to pitch lawyer?
									<br />
									Go to: <NavLink style ={{textDecoration : "none"}}to = "/prep-and-pitch"> Prep & Pitch ⚖️ </NavLink>
									<br />
									Need legal muscle?
									<br />
									Go to: <NavLink style ={{textDecoration: "none"}}to = "/find-lawyer">Find Lawyer </NavLink>
								</p>
								<div className="vid-img"></div>
								<div>
									{" "}
									<p>
										Too late to read the text?
										<br /> No worries!!
										<br /> click{" "}
										<a href="https://www.youtube.com/playlist?list=PL8E_yW0GJOLKJVglKxy_kVZzuPK29n_Kc">
											here
										</a>{" "}
										to watch video{" "}
									</p>
								</div>
							</div>
						</div>
						<div>
							<span id="det">Pro Tip:</span>
							<div className="lawyer-card">
								<p>
									Make sure you have all the necessary
									information before you start, such as the
									date, time, and location of the incident,
									and the details of the people involved. Be
									clear and concise in your complaint.
									<br />
									Proofread your complaint carefully before
									submitting it.
									<br />
									Keep a copy of your complaint for your
									records.
								</p>
							</div>
						</div>
					</div>{" "}
				</div>
			</div>
		</>
	);
}

export default Efiling;
