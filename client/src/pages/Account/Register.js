import React, { useState } from "react";
import "../../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Navbar from "../../components/Navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userCnfPass, setUserCnfPass] = useState("");
  const [userRole, setUserRole] = useState("user");

  const [unamefocus, setUnamefocus] = React.useState(false);
  const [namefocus, setNamefocus] = React.useState(false);
  const [passfocus, setPassfocus] = React.useState(false);
  const [cpassfocus, setCpassfocus] = React.useState(false);
  const [emailfocus, setEmailfocus] = React.useState(false);
  const [available, setavailable] = React.useState(true);
  const [show, setShow] = useState(false);
  const [Specialization, setSpecialization] = useState("");
  const [age, setAge] = useState("");
  const [casesFought, setCasesFought] = useState("");
  const [casesWon, setCasesWon] = useState("");
  const [about, setAbout] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function handleForm(event) {
    event.preventDefault();

    let userData = {
	  name: name,
	  email: userEmail,
	  username: userName,
	  password: userPassword,
	  passwordConfirm: userCnfPass,
	  role: userRole,

    };

    if (userData.role === "lawyer") {
      userData = {
        name: name,
        email: userEmail,
        username: userName,
        password: userPassword,
        passwordConfirm: userCnfPass,
        role: userRole,
        typeOfLawyer: Specialization,
        numberOfCasesFought: casesFought,
        numberOfCasesWon: casesWon,
        experienceInYears: experience,
        age: age,
        about: about,
        feesCharged: fees,
      };

    //   try {
        const response = await fetch(
          "http://localhost:5001/api/v1/users/signup",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
			if(data.status === "fail"){
				alert("Please fill the additional fields before submitting!!");
			}
            if (data.status === "success") {
              navigate("/login");
			  alert(
				`Congratulations ${userName} you are successfully registered with us. Please Login to Explore More!!`
			  );
            }
          });
    //   } catch (err) {
    //     alert(
    //       `Entered Email : ${userEmail} or Username: ${userName} is not available!! Please ensure that your Email and Username are Unique.`
    //     );
    //   }
    }
	 else {
      try {
        const response = await fetch(
          "http://localhost:5001/api/v1/users/signup",
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            // console.log(data);
            if (data.status === "success") {
              navigate("/login");
            }
          });
        alert(
          `Congraulations ${userName} you are successfully registered with us. Please Login to Explore More!!`
        );
      } catch (err) {
        alert(
          `Entered Email : ${userEmail} or Username: ${userName} is not available!! Please ensure that your Email and Username are Unique.`
        );
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="register-card">
        <div className="login-title">
          <span className="initial login-txt">S</span>
          <span className="login-txt">ign Up</span>
        </div>

        <div className="register-form">
          <form onSubmit={handleForm}>
            <div className="form-group">
              <div className="label-wrapper">
                <label
                  htmlFor="fullname"
                  className={namefocus ? `input-label` : `hide-element`}
                >
                  Full Name
                </label>
              </div>
              <input
                type="text"
                className="form-input"
                id="fullname"
                placeholder="Full Name"
                onFocus={() => setNamefocus(true)}
                onBlur={() => setNamefocus(false)}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="label-wrapper">
                <label
                  htmlFor="email"
                  className={emailfocus ? `input-label` : `hide-element`}
                >
                  Email ID
                </label>
              </div>
              <input
                type="email"
                className="form-input"
                id="email"
                placeholder="Email ID"
                onFocus={() => setEmailfocus(true)}
                onBlur={() => setEmailfocus(false)}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="label-wrapper">
                <div>
                  <label
                    htmlFor="username"
                    className={unamefocus ? `input-label` : `hide-element`}
                  >
                    Username
                  </label>
                </div>
                <div>
                  {available && (
                    <span
                      className={
                        unamefocus ? `available input-label` : `hide-element`
                      }
                    >
                      Available
                    </span>
                  )}
                  {!available && (
                    <span
                      className={
                        unamefocus ? `unavailable input-label` : `hide-element`
                      }
                    >
                      Unavailable
                    </span>
                  )}
                </div>
              </div>
              <input
                type="text"
                className="form-input"
                id="username"
                placeholder="Username"
                onFocus={() => setUnamefocus(true)}
                onBlur={() => setUnamefocus(false)}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="label-wrapper">
                <label
                  htmlFor="password"
                  className={passfocus ? `input-label` : `hide-element`}
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                className="form-input"
                id="password"
                placeholder="Password"
                onFocus={() => setPassfocus(true)}
                onBlur={() => setPassfocus(false)}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <div className="label-wrapper">
                <label
                  htmlFor="cnfpassword"
                  className={cpassfocus ? `input-label` : `hide-element`}
                >
                  Re-enter Password
                </label>
              </div>
              <input
                type="password"
                className="form-input"
                id="cnfpassword"
                placeholder="Confirm Password"
                onFocus={() => setCpassfocus(true)}
                onBlur={() => setCpassfocus(false)}
                onChange={(e) => setUserCnfPass(e.target.value)}
              />
            </div>
            <div className="form-group2">
              <label htmlFor="role" className="input-label">
                Register as:
              </label>
              <select
                id="role"
                className="form-input-select"
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="lawyer">Lawyer</option>
              </select>
            </div>
            <div className="btn-wrapper">
              {userRole === "lawyer" ? (
                <button className="btn btn-primary" onClick={handleShow}>
                  Next
                </button>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              )}

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{}}
              >
                <Modal.Header closeButton style={{backgroundColor : "#938f8f99", color : "white"}}>
                  <Modal.Title>Additional Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={handleForm}>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Specialization<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="eg. Crime,Corporate etc."
                          onChange={(e) => setSpecialization(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>
                          Age (in Years)<span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="as per Aadhar Card"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Number of cases fought
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setCasesFought(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>
                          Number of cases won
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setCasesWon(e.target.value)}
                        />
                      </Form.Group>
                    </Row>
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>
                          Experience (in years)
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setExperience(e.target.value)}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>
                          Fees Charged per case
                          <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder=""
                          onChange={(e) => setFees(e.target.value)}
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formGridAddress1">
                      <Form.Label>
                        About<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        placeholder="Let the world know who you are :)"
                        onChange={(e) => setAbout(e.target.value)}
                      />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleForm}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </form>
          <div className="login-link">
            <a href="/login" className="links-lc acc-link">
              Already have an account?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
