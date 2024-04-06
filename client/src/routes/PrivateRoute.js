import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import getCookies from "../hooks/getCookies";


const PrivateRoute = ({ render: Component, ...rest }) => {
	const { user } = AuthData();
	const navigate = useNavigate();
	const isAuthenticated = user.isAuthenticated;
	console.log("inside private routes", isAuthenticated);
    
	if (!isAuthenticated) {
		navigate("/login");
	}
	return (
		<Route
			{...rest}
			render={(props) => {
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Navigate to="/login" />
				);
			}}
		/>
	);
};

export default PrivateRoute;
