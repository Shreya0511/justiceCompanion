import React from "react";
import "../../styles/Dashboard/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faIcons,
	faPhone,
	faAddressCard,
	faUser,
	faHome,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
	return (
		<div className="footer">
			<div className="col">
				<ul>
					<li>
						<FontAwesomeIcon
							icon={faHome}
							className="footer-icons"
						/>{" "}
						<Link to="/Dashboard" className="footer-link">
							Dashboard
						</Link>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faUser}
							className="footer-icons"
						/>{" "}
						<Link to="/me" className="footer-link">
							Profile
						</Link>
					</li>
					<li>
						<FontAwesomeIcon
							icon={faAddressCard}
							className="footer-icons"
						/>
						About Us
					</li>
				</ul>
			</div>
			<div className="colm">
				<ul>
					<li></li>
					<li>two</li>
					<li>two</li>
				</ul>
			</div>
			<div className="colm">
				<ul>
					<li>three</li>
					<li>three</li>
					<li>three</li>
				</ul>
			</div>
		</div>
	);
}

export default Footer;
