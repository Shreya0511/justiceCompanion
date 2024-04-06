import React from 'react'
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from 'react';
import { AuthData } from '../services/AuthService';

const ChangePasswordFrom = () => {
    const [passwordCurrent,setPasswordCurrent ] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const {user, updatePassword } = AuthData();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userDetails = {};
        try{
          if(passwordCurrent != ""){
            userDetails.passwordCurrent = passwordCurrent;
          }
          if(password != ""){
            userDetails.password = password;
          }
          if(passwordConfirm != ""){
            userDetails.passwordConfirm = passwordConfirm;
          }
          console.log("userDetails", userDetails);
    
          await updatePassword(userDetails);
        }
        catch(err){
          console.log(err);
            alert("Error in updating the account details!!");
        }
    }

    const handlePasswordCurrent = (e) => {
        setPasswordCurrent(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handlePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    }


  return (
    <>
          <Form
        style={{
          marginTop: "3rem",
          backgroundColor: "#5b5653",
          borderRadius: "0.5rem",
          height: "22rem",
          widht: "22rem",
          padding: "1.3rem",
          paddingRight: "2rem",
        }}
      >
        <Row
          style={{
            marginLeft: "0rem",
            marginTop: "0.5rem",
            marginBottom: "0.8rem",
            color: "#dbbda5",
            fontSize: "1.3rem",
            fontWeight: "medium",
          }}
        >
          Update Password
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridEmail" style = {{display : "flex"}}>
            <Form.Label style = {{flex : "2", fontSize : "1.1rem"}}>Current Password : </Form.Label>
            <Form.Control style = {{flex : "7"}} type="text" placeholder="********" onChange ={handlePasswordCurrent}/>
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridEmail" style = {{display : "flex"}}>
            <Form.Label style = {{flex : "2", fontSize : "1.1rem"}}>New Password : </Form.Label>
            <Form.Control style = {{flex : "7"}} type="password" placeholder="********" onChange = {handlePassword} />
          </Form.Group>
        </Row>

        <Row className="mb-4" style={{ display: "flex" }}>
          <Form.Group as={Col} controlId="formGridEmail" style={{display : "flex"}}>
            <Form.Label style={{flex : "2", fontSize : "1.1rem"}}>Confirm New Password : </Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              style={{  flex : "7" }}
              onChange = {handlePasswordConfirm}
            />
          </Form.Group>
        </Row>
        
        <div style ={{display : "flex", marginTop : "2rem"}}>

        <Button variant="primary" type="submit" size= "md" onClick = {handleSubmit} style ={{margin : "auto"}}>
          Submit
        </Button>
        </div>
      </Form>

    </>
  )
}

export default ChangePasswordFrom
