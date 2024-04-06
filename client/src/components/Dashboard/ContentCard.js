import React from "react";
import "../../styles/Dashboard/ContentCard.css";
import { useNavigate } from "react-router-dom";

function ContentCard(props) {
	const navigate = useNavigate();
	// console.log(props.links);
	const handleClick = (content) => {
		// console.log(content);
		if (content.path && props.links) {
			// window.location.href = content.path;
			navigate(content.path);
		} else {
			alert("Login to access this section");
		}
	};
	const content = props.content;
	// console.log(props.pos);
	if (props.pos === 1) {
		return (
			<div
				className={"content-wrapper wrapper-right"}
				onClick={() => handleClick(content)}
			>
				<div className="content-img">
					{/* {console.log(content.img)} */}
					<img src={content.img} alt={content.title} />
				</div>
				<div className="content-desc">
					<div className="content-title">{content.title}</div>
					<div className="content-description">
						{content.description}
					</div>
				</div>
			</div>
		);
	} else
		return (
			<div
				className={"content-wrapper wrapper-left"}
				onClick={() => handleClick(content)}
			>
				<div className="content-desc">
					<div className="content-title">{content.title}</div>
					<div className="content-description">
						{content.description}
					</div>
				</div>
				<div className="content-img">
					
					<img src={content.img} alt={content.title} />
				</div>
			</div>
		);
}

export default ContentCard;
