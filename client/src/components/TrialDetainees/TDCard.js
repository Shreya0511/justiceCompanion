import React from "react";

function TDCard(props) {
	const { desc, title, list } = props;
	return (
		<div className="prep-section">
			<div
				className="title-bg"
				style={{
					backgroundImage: `url(${require("../../assets/prepPitchImgs/bg2.jpg")})`,
				}}
			>
				<div className="title-bg-ovrlp">
					<div className="prep-title">{title}</div>
					<div className="prep-desc">{desc}</div>
				</div>
			</div>
			<div className="fade-effect"></div>
			<div className="prep-content">
				<div className="prep-list">
					{list.map((item, index) => {
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
	);
}

export default TDCard;
