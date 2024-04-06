import React from "react";

function ProfileImg({ person }) {
	return (
		<>
			<img
				// src={`http://localhost:5001/uploads/${person.image}`}
				src = {person.image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? person.image : `http://localhost:5001/uploads/${person.image}`}

				className="lawyer-image"
			></img>
		</>
	);
}

export default ProfileImg;
