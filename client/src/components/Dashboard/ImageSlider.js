import React, { useEffect, useState } from "react";
import "../../styles/Dashboard/Slider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { AuthData } from "../../services/AuthService";

const images = [
	"https://images.unsplash.com/photo-1642714883398-dc313be9c4c6?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1589994965851-a8f479c573a9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"https://images.unsplash.com/photo-1591189824361-e61ccc736d44?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const ImageSlider = () => {
	// const {user} = AuthData();
	const [index, setIndex] = useState(0);
	const max = images.length;
	const nextSlide = () => {
		const nind = (index + 1) % max;
		setIndex(nind);
	};
	const prevSlide = () => {
		if (index) setIndex(index - 1);
		else setIndex(max - 1);
	};
	useEffect(() => {
        const timeoutId = setTimeout(() => {
            nextSlide();
        }, 4000);
    
        return () => {
            clearTimeout(timeoutId); // Clear the timeout when the component is unmounted
        };
	}, [index]);
	return (
		<div className="slider-wrapper">
			<div className="slider-button">
				<button onClick={prevSlide}>
					<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
				</button>
			</div>
			<div className="slider-slide-wrapper">

				<img src={images[index]}></img>
			</div>
			<div className="slider-button">
				<button onClick={nextSlide}>
					<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>
				</button>
			</div>
		</div>
	);
};

export default ImageSlider;
