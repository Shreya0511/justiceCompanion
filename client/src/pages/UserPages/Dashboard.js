import ImageSlider from "../../components/Dashboard/ImageSlider.js";
import Navbar from "../../components/Navbar.js";
import RotatingScales from "../../components/RotatingScales.js";
import { AuthData } from "../../services/AuthService.js";
function Dashboard() {
	const { user } = AuthData();
	return (
		<>
			<Navbar />
			<RotatingScales />
			<div
				className="dashboardLawyer"
				style={{
					position: "relative",
					display: "flex",
					flexDirection: "column",
					// justifyContent: "center",
					alignItems: "center",
					height: "90vh",
					width: "100vw",
					overflow: "scroll",
					// backgroundColor: "white",
					// zIndex: "10",
				}}
			>
				<h1>Welcome {JSON.parse(user.user).name}!! 👋🏻</h1>
				{/* <ImageSlider />
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2>
				<h2>ijsdncsd</h2> */}
			</div>
		</>
	);
}

export default Dashboard;
