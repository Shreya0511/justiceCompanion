import { useEffect, useState } from "react";
import { AuthData } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/Routes";
import getCookies from "../../hooks/getCookies";
import removeCookies from "../../hooks/removeCookies";
import setCookies from "../../hooks/setCookies";

function NotFound() {
	const privateRoutes = [];
	routes.map((route, index) => {
		if (route.isPrivate) {
			privateRoutes.push(route.path);
		}
		return null;
	});

	const [errorMsg, setErrorMsg] = useState("");
	const [redirectMsg, setRedirectMsg] = useState("");
	const { user } = AuthData();
	const navigate = useNavigate();
	useEffect(() => {
		if (
			privateRoutes.includes(window.location.pathname) &&
			!user.isAuthenticated
		) {
			setErrorMsg("You are not authorized to view this page");
			
		} else {
			setErrorMsg("The page you are looking for does not exist");
			
		}
	});

	useEffect(() => {
		setTimeout(function () {
			// console.log("user", isprotected);
			if (user.isAuthenticated) {
				navigate("/dashboard");
			} else {
				if (privateRoutes.includes(window.location.pathname)) {
					navigate("/login");
				} else navigate("/home");
			}
		}, 30000);
	}, [user, navigate]);

	return (
		<div className="not-found-container">
			<h2 className="not-found-subtitle">{errorMsg}</h2>
			<p className="not-found-text"><button
				style={{
					backgroundColor: "var(--primary-color)",
					color: "white",
					border: "none",
					padding: "10px 20px",
					cursor: "pointer",
				}}
				onClick={() => {
					navigate("/home");
				}}
			>Login</button></p>
		</div>
	);
}

export default NotFound;
