// import ImageSlider from "./ImageSlider.js";
import Navbar from "../Navbar.js";
// import RotatingScales from "../RotatingScales.js";
import { AuthData } from "../../services/AuthService.js";
import displaycontent from "./DashboardContent.js";
import ContentCard from "./ContentCard.js";
import Footer from "./Footer.js";
function Dashboard({ links }) {
	const { user } = AuthData();
	const content = displaycontent.filter((cont) => {
		// console.log(JSON.parse(user.user).role);
		if (user.isAuthenticated && JSON.parse(user.user).role === "lawyer") {
			return cont.lawyer;
		} else {
			return cont.user;
		}
	});
	return (
		<>
			<Navbar home={true} />
			{/* <RotatingScales /> */}
			<div
				className="dashboardLawyer"
				style={{
					position: "relative",
					// display: "flex",
					display: "block",
					// flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "90vh",
					width: "100%",
					overflow: "scroll",
					// backgroundColor: "white",
					// zIndex: "10",
				}}
			>
				{/* <ImageSlider /> */}
				{content.map((cont, index) => {
					return (
						<ContentCard
							content={cont}
							pos={index % 2}
							key={index}
							index={index}
							links={links}
						/>
					);
				})}
				<Footer />
			</div>
		</>
	);
}

export default Dashboard;
