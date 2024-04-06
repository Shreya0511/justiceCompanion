import React, { useEffect, useState } from "react";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthData } from "../../services/AuthService";
import Navbar from "../../components/Navbar";

function Login() {
	const [unamefocus, setUnamefocus] = useState(false);
	const [passfocus, setPassfocus] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const navigate = useNavigate();

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};
	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const { login } = AuthData();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await login(email, password);
		} catch (error) {
			setErrorMessage(error);
			console.log(errorMessage);
		}
	};

	return (
		<>
			<Navbar />
			<div className="login-card">
				<div className="login-title">
					<span className="initial login-txt">L</span>
					<span className="login-txt">ogin</span>
				</div>

				<div className="login-form">
					<form>
						<div className="form-group">
							<div className="label-wrapper">
								<label
									htmlFor="username"
									className={
										unamefocus
											? `input-label`
											: `hide-element`
									}
								>
									Email ID / Username
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
						<div className="form-group">
							<div className="label-wrapper">
								<label
									htmlFor="password"
									className={
										passfocus
											? `input-label`
											: `hide-element`
									}
								>
									Password
								</label>
							</div>
							<input
								type="password"
								className="form-input"
								id="password"
								placeholder="Password"
								onChange={handlePassword}
								onFocus={() => setPassfocus(true)}
								onBlur={() => setPassfocus(false)}
							/>
						</div>
						<div className="form-group2">
							<div>
								<input type="checkbox" id="remember" />
								<label
									htmlFor="remember"
									className="input-label check-box"
								>
									Remember me
								</label>
							</div>
							<div>
								<a
									href="/forgotPassword"
									className="links-lc input-label"
								>
									Forgot Password?
								</a>
							</div>
						</div>
						<div className="btn-wrapper">
							<button
								type="submit"
								className="btn btn-primary"
								id="login-btn"
								onClick={handleSubmit}
							>
								Login
							</button>
						</div>
					</form>
					<div className="login-link">
						<a href="/sign-up" className="links-lc forgot-link">
							Don't have an account?
						</a>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
