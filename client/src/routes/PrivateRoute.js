import React from "react";
import { Route, Navigate, useNavigate } from "react-router-dom";
import getCookies from "../hooks/getCookies";


const PrivateRoute = ({ render: Component, ...rest }) => {
	const { user } = AuthData();
	const navigate = useNavigate();
	const isAuthenticated = user.isAuthenticated;
	console.log("inside private routes", isAuthenticated);

	if(isAuthenticated === null){
		<div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FontAwesomeIcon
          style={{
            fontSize: "2rem",
          }}
          icon={faSpinner}
          spin
        />
      </div>
	}
    
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
