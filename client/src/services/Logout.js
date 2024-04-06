import { useNavigate } from "react-router-dom";
import { AuthData } from "./AuthService";
import { useEffect } from "react";

function Logout() {
	const { logout } = AuthData();
	const navigate = useNavigate();
	useEffect(() => {
		logout();
		navigate("/home");
	}, [logout, navigate]);
	return <></>;
}

export default Logout;
