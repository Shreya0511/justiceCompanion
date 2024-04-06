import React, {useEffect, useState} from "react";
import Axios from 'axios';
import "./styles/App.css";
import { AuthWrapper } from "./services/AuthService";

function App() {
	const [data, setData] = useState("");


	return (
		<div className="App">
			<AuthWrapper />
			{/* {data} */}
		</div>
	);
}

export default App;
