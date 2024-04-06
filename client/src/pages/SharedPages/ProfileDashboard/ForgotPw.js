import React, { useEffect, useState } from "react";
import "../../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../../services/AuthService";

function ForgotPw() {
	const [email, setEmail] = useState("");
	const [unamefocus, setUnamefocus] = useState(false);
	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const { login } = AuthData();

	const handleSubmit = async (event) => {
		event.preventDefault();

		let userData = {
			email: email,
		};

		try {
			const response = await fetch(
				"http://localhost:5001/api/v1/users/forgotPassword",
				{
					method: "post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(userData),
				}
			)
				.then((response) => response.json())
				.then((data) => {
					console.log("data", data);
					alert(
						"We have sent you an email with a link to change your password. Please check your email and use that link to continue."
					);
				});
		} catch (err) {
			alert("Wrong Credentaials!!");
		}

		// try {
		// 	await login(email, password);
		// } catch (error) {
		// 	setErrorMessage(error);
		// 	console.log(errorMessage);
		// }
	};

	return (
		<div className="login-card">
			<div className="login-title">
				<span className="initial login-txt">F</span>
				<span className="login-txt">orgot </span>
				<span className="initial login-txt">P</span>
				<span className="login-txt">assword</span>
			</div>

			<div className="login-form">
				<form>
					<div className="form-group">
						<div className="label-wrapper">
							<label
								htmlFor="username"
								className={
									unamefocus ? `input-label` : `hide-element`
								}
							>
								Email ID
							</label>
						</div>
						<input
							type="text"
							className="form-input"
							id="username"
							placeholder="Email ID / Username"
							onChange={handleEmail}
							onFocus={() => setUnamefocus(true)}
							onBlur={() => setUnamefocus(false)}
						/>
					</div>
					<div className="btn-wrapper">
						<button
							type="submit"
							className="btn btn-primary"
							id="login-btn"
							onClick={handleSubmit}
						>
							Reset Password
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ForgotPw;
