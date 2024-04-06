import React from "react";

function ProfileImg({ person }) {
	return (
		<>
			<img
				// src={`${process.env.REACT_APP_SERVER}/uploads/${person.image}`}
				src = {person.image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? person.image : `${process.env.REACT_APP_SERVER}/uploads/${person.image}`}

				className="lawyer-image"
			></img>
		</>
	);
}

export default ProfileImg;
