import React from "react";
import Navbar from "../../components/Navbar";
// import {conte}
import {
	content,
	questions,
	documents,
	desc,
} from "../../components/PrepPitch/prepContent.js";
import "../../styles/PrepPitch.css";
import Footer from "../../components/Dashboard/Footer";
function PrepAndPitch() {
	console.log(documents);
	return (
		<>
			<Navbar />
			{/* < */}
			<div className="prepPitchWrapper">
				<div className="prep-section">
					<div className="title-bg">
						<div
							className="title-bg-ovrlp"
							style={{
								backgroundImage: `url(${require("../../assets/prepPitchImgs/bg1.jpg")})`,
								backgroundSize: "cover",
								backgroundRepeat: "no-repeat",
							}}
						>
							<div className="prep-title">
								Wondering how to approach a lawyer?
							</div>
							<div className="prep-desc">{desc.approach}</div>
						</div>
					</div>
					<div className="fade-effect"></div>
					<div className="prep-content">
						<div className="prep-list">
							{content.map((item, index) => {
								return (
									<div key={index} className="prep-card">
										<div className="prep-subtitle">
											{item.title}
										</div>
										<div className="prep-content-desc">
											<p>{item.desc}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="prep-section">
					<div
						className="title-bg"
						style={{
							backgroundImage: `url(${require("../../assets/prepPitchImgs/bg2.jpg")})`,
						}}
					>
						<div className="title-bg-ovrlp">
							<div className="prep-title">
								Questions to ask a lawyer
							</div>
							<div className="prep-desc">{desc.questions}</div>
						</div>
					</div>

					{/* <div className="prep-title">Questions to ask a lawyer</div> */}
					<div className="prep-content">
						{/* <p>{desc.questions}</p> */}
						<div className="prep-list">
							{questions.map((item, index) => {
								return (
									<div key={index} className="prep-card">
										<div className="prep-subtitle">
											{item.title}
										</div>
										<div className="prep-content-desc">
											<ul>
												{item.list.map(
													(question, index) => {
														return (
															<li key={index}>
																{
																	question.question
																}
															</li>
														);
													}
												)}
											</ul>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="prep-section">
					<div
						className="title-bg"
						style={{
							backgroundImage: `url(${require("../../assets/prepPitchImgs/bg1.jpg")})`,
						}}
					>
						<div className="title-bg-ovrlp">
							<div className="prep-title">
								Documents to prepare
							</div>
							<div className="prep-desc">{desc.documents}</div>
						</div>
					</div>
					<div className="prep-content">
						<div className="prep-list">
							{documents.map((item, index) => {
								return (
									<div key={index} className="prep-card">
										<div className="prep-subtitle">
											{item.title}
										</div>
										<div className="prep-content-desc">
											<p>{item.desc}</p>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
}

export default PrepAndPitch;
