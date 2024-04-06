import React from "react";
import Figure from "react-bootstrap/Figure";
import { AuthData } from "../services/AuthService";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const ImageContainer = () => {
  const { user } = AuthData();
  return (
    <div style ={{backgroundColor : "#5b5653", marginTop : "3rem", height : "19rem", width : "19rem", borderRadius : "0.5rem"}}>
      <Figure style = {{display : "flex", flexDirection: "column",margin : "auto"}}>
              <Figure.Image
              style = {{margin : "auto", borderRadius:"50%", marginTop : "1.5rem"}}
        width={171}
        height={180}
        alt="171x180"
        src = {JSON.parse(user.user).image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? JSON.parse(user.user).image : `http://localhost:5001/uploads/${JSON.parse(user.user).image}`}
      />
        <Figure.Caption style ={{marginTop : "1rem", display : "flex", flexDirection: "column"}}>
          <div style = {{margin : "auto", fontSize: "1.5rem", fontWeight:"bold", color : "white"}}>{JSON.parse(user.user).name}</div>
          <div style = {{margin : "auto", color : "#dbbda5", fontSize : "1rem"}}>{JSON.parse(user.user).role}</div>
        </Figure.Caption>
      </Figure>
    </div>
  );
};

export default ImageContainer;
