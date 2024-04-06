import React from "react";
import "../../styles/Home.css";
import description from "../../assets/desc";
import Navbar from "../../components/Navbar";
import { AuthData } from "../../services/AuthService";
import Dashboard from "../../components/Dashboard/Dashboard";

function Home() {
	const { user } = AuthData();

	return (
		<>
			<Dashboard links={false}/>
		</>
	);
}

export default Home;
