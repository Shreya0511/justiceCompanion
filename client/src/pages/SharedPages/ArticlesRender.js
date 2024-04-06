import React from "react";
import ProfileNavbar from "../../components/ProfileNavbar";
import "../../styles/ArticlesRender.css";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import SearchLegal from "../../components/SearchLegal";
const sample = require("../../assets/COI.json");

const ArticlesRender = ({ index }) => {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	useEffect(() => {
		const index = localStorage.getItem("Index");
		const data = sample[0][index];
		setData(data);
	}, [navigate.location]);

	return (
		<>
			{window.location.pathname === "/guide" ? <></> : <Navbar />}
			
			<div className="articleMainContainer">
			
				<div className="articleContainer">
					<div className="articleRow">
						<span className="colTitle">Article No: </span>
						<span>
							{sample[0][localStorage.getItem("Index")]
								? sample[0][localStorage.getItem("Index")].ArtNo
								: sample[0][0].ArtNo}
						</span>
					</div>
					<div className="articleRow">
						<span className="colTitle">Name: </span>
						{sample[0][localStorage.getItem("Index")]
							? sample[0][localStorage.getItem("Index")].Name
							: sample[0][0].Name}
					</div>
					{sample[0][localStorage.getItem("Index")].SubHeading ? (
						<div className="articleRow">
							<span className="colTitle">SubHeading: </span>
							{sample[0][localStorage.getItem("Index")]
								? sample[0][localStorage.getItem("Index")]
										.SubHeading
								: sample[0][0].SubHeading}
						</div>
					) : (
						<></>
					)}
					{sample[0][localStorage.getItem("Index")].ArtDesc ? (
						<div className="articleRow">
							<span className="colTitle">
								Article Description:{" "}
							</span>
							{sample[0][localStorage.getItem("Index")]
								? sample[0][localStorage.getItem("Index")]
										.ArtDesc
								: sample[0][0].ArtDesc}
						</div>
					) : (
						<></>
					)}
					{sample[0][localStorage.getItem("Index")].Status ? (
						<div className="articleRow">
							<span className="colTitle">Status: </span>
							{sample[0][localStorage.getItem("Index")]
								? sample[0][localStorage.getItem("Index")]
										.Status
								: sample[0][0].Status}
						</div>
					) : (
						<></>
					)}
					{sample[0][localStorage.getItem("Index")].Clauses ? (
						<div className="articleRow">
							<span className="colTitle">Clauses: </span>
							{sample[0][
								localStorage.getItem("Index")
							].Clauses.map((clause) => (
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "0.5rem" }}>
										{clause.ClauseNo}.
									</div>
									<div>{clause.ClauseDesc}</div>
								</div>
							))}
						</div>
					) : (
						<></>
					)}

					{sample[0][localStorage.getItem("Index")].Explanations ? (
						<div>
							<span className="colTitle">Explanations: </span>
							{sample[0][
								localStorage.getItem("Index")
							].Explanations.map((clause) => (
								<div style={{ display: "flex" }}>
									<div style={{ marginRight: "0.5rem" }}>
										{clause.ExplanationNo}.
									</div>
									<div>{clause.Explanation}</div>
								</div>
							))}
						</div>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	);
};

export default ArticlesRender;
