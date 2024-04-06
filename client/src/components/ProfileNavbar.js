import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { AuthData } from "../services/AuthService";

const ProfileNavbar = () => {
  const { user } = AuthData();
  console.log(JSON.parse(user.user).image);
  return (
    <div style={{ margin: "0px", paddingLeft: "0px", paddingRight: "0px", backgroundColor : "#141414" }}>
      <Navbar
        bg="dark"
        data-bs-theme="dark"
        expand="lg"
        className="bg-body-tertiary "
      >
        <Container style={{ display: "flex", boxSizing: "border-box" }}>
          <Navbar.Brand href="/me" style={{ display: "flex", width: "100%", zIndex : "1000" }}>
            <div style={{ flex: 7 }}></div>
            <div style={{ display: "flex", flex : 2 }}>
              <div
                style={{ heigth: "2rem", width: "2rem", borderRadius: "50%"}}
              >
                <img
        src = {JSON.parse(user.user).image === "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" ? JSON.parse(user.user).image : `http://localhost:5001/uploads/${JSON.parse(user.user).image}`}
        style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                />
              </div>
              <span
                style={{
                  fontSize: "1rem",
                  margin: "auto",
                  marginLeft: "0.8rem",
                }}
              >
                {JSON.parse(user.user).username}
              </span>
            </div>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
};

export default ProfileNavbar;
