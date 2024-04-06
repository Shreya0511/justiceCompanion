import React from "react";
import Figure from "react-bootstrap/Figure";
import { AuthData } from "../services/AuthService";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import getCookies from "../hooks/getCookies";


const ImageContainer = () => {
  const [image, setImage] = useState("");

  const { user, updateMe, setUser } = AuthData();

  const handleImage = async (e) => {
    console.log("file", e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
 

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/api/v1/users/updateProfileImage",
        {
          method: "PATCH",
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Bearer ${getCookies("jwt")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
            "Access-Control-Allow-Methods":
              "GET, HEAD, POST, PUT, DELETE,PATCH, OPTIONS",
          },
          body: formData
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          localStorage.setItem("userInfo", JSON.stringify(data.data.User));
          setUser({
            user: localStorage.getItem("userInfo"),
            isAuthenticated: true,
          });
          alert(
            "Congratulations!! You have succesfully changed your details..."
          );
        });
    } catch (err) {
      console.log(err);
      // setUser({ user: "", isAuthenticated: false });
      alert("Unable to Upload the profile image!! Please try again later.");
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#5b5653",
        marginTop: "3rem",
        height: "25rem",
        width: "25rem",
        borderRadius: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingTop: "0.8rem",
        }}
      >
        <div
          style={{ margin: "auto", fontSize: "1.3rem", marginBotton: "1rem" }}
        >
          Profile Picture
        </div>
        <div style={{ border: "0.01rem solid white" }}></div>
      </div>
      <Figure
        style={{ display: "flex", flexDirection: "column", margin: "auto" }}
      >
        <Figure.Image
          style={{ margin: "auto", borderRadius: "50%", marginTop: "1.5rem" }}
          width={171}
          height={180}
          alt="171x180"
          src = {JSON.parse(user.user).image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? JSON.parse(user.user).image : `http://localhost:5001/uploads/${JSON.parse(user.user).image}`}
          />
        <Figure.Caption
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              margin: "auto",
              fontSize: "1rem",
              color: "white",
              paddingBottom: "0.3rem",
            }}
          >
            JPG or PNG no larger than 5 MB
          </div>
          <Form.Group
            style={{ width: "29%", margin: "auto" }}
            controlId="formFile"
            className="mb-3"
          >
            <Form.Control
              type="file"
              // value = {FormData.picture}
              style={{ backgroundColor: "blue" }}
              onChange={handleImage}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            size="sm"
            onClick={handleSubmit}
            style={{ margin: "auto" }}
          >
            Submit
          </Button>
        </Figure.Caption>
      </Figure>
    </div>
  );
};

export default ImageContainer;
