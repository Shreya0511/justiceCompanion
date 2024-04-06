import React from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { AuthData } from "../services/AuthService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import "./../styles/UserInfo.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const UserInfo = () => {
  const { user } = AuthData();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const {updateMe} = AuthData();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleName = (e) => {
    setName(e.target.value);
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {};
    try{
      if(name != ""){
        userDetails.name = name;
      }
      if(email != ""){
        userDetails.email = email;
      }
      if(username != ""){
        userDetails.username = username;
      }
      console.log("userDetails", userDetails);

      await updateMe(userDetails);
    }
    catch(err){
      console.log(err);
        alert("Error in updating the account details!!");
    }
  }

  return (
    <>
      <Form
        style={{
          marginTop: "3rem",
          backgroundColor: "#5b5653",
          borderRadius: "0.5rem",
          height: "25rem",
          widht: "25rem",
          padding: "1.3rem",
          paddingRight: "2rem",
        }}
      >
        <Row
          style={{
            marginLeft: "0rem",
            marginTop: "0.5rem",
            marginBottom: "0.5rem",
            color: "#dbbda5",
            fontSize: "1.3rem",
            fontWeight: "medium",
          }}
        >
          Edit Account Details
        </Row>
        <Row className="mb-3" style={{ display: "flex" }}>
          <Form.Group as={Col} controlId="formGridEmail" style={{}}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder={JSON.parse(user.user).username}
              style={{ marginRight: "5rem" }}
              onChange = {handleUsername}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder={JSON.parse(user.user).name} onChange ={handleName}/>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder={JSON.parse(user.user).email} onChange = {handleEmail} />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" size= "sm" onClick = {handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UserInfo;
