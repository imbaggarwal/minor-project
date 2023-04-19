import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function SignUp() {

  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showInvalidEmail, setShowInvalidEmail] = useState(false);
  const [showMissingFieldsAlert, setShowMissingFieldsAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [data, setData] = useState({
    name: "",
    username: "",
    phone: "",
    password: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  }

  function validatePassword(pswd){
    const re = /^(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(pswd);
  }

  function validateName(str){
    const re = /^[A-Za-z ]+$/;
    return re.test(str);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check if all required fields are filled
    const requiredFields = ["name", "username", "phone", "password"];
    const hasMissingFields = requiredFields.some((field) => !data[field]);
    if (hasMissingFields) {
      setShowMissingFieldsAlert(true);
      return;
    }

    if (validateEmail(data.username) && validatePhone(data.phone) && validatePassword(data.password) && validateName(data.name)) {
      axios.post("/signup", data, {
        headers: { 'Content-Type': 'application/json' }
      }).then(function (res) {
        console.log(res.data);
        if (res.data === "found") {
          setShow(true);
        } else {
          navigate("/");
        };
      });
    }
    else {
      if(!validateEmail(data.username)){
        setErrorMsg("Invalid email address");
      }
      else if(!validatePassword(data.password)){
        setErrorMsg("Invalid Password");
      }
      else if(!validateName(data.name)){
        setErrorMsg("Invalid Name input");
      }
      else{
        setErrorMsg("Invalid phone no.");
      }
       // set a specific error message for invalid email
      setShowInvalidEmail(true);
      return;
    }


  }


  return (
    <div className="auth-wrapper">
      <div className="auth-inner">

        <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
          <Alert.Heading>User Already Exists</Alert.Heading>
          <p>
            A user with this email address already exists in the database.
            Use a different email address or try logging in.
          </p>
          <hr />
        </Alert>

        <Alert variant="danger" show={showMissingFieldsAlert} onClose={() => setShowMissingFieldsAlert(false)} dismissible>
          <Alert.Heading>Missing Required Fields</Alert.Heading>
          <p>
            Please fill in all required fields before submitting the form.
          </p>
          <hr />
        </Alert>

        <Alert variant="danger" show={showInvalidEmail} onClose={() => setShowInvalidEmail(false)} dismissible>
          <Alert.Heading>{errorMsg}</Alert.Heading>
          
          <hr />
        </Alert>

        <Container fluid>
          <Row>
            <Col sm>
              <form>
                <h3>Sign Up</h3>
                <div className="mb-3">
                  <label>Name</label>
                  <input type="text" name="name" className="form-control" placeholder="Name" pattern="[A-Za-z]+" required autoComplete='false' onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input type="email" name="username" className="form-control" placeholder="Enter email" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Phone no.</label>
                  <input type="tel" name="phone" className="form-control" placeholder="Enter phoneNo" required onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" placeholder="Enter password" pattern="(?=.*\d)(?=.*[\W_]).{8,}" required onChange={handleChange} />
                  <small>Password should have atleast one special character and one number</small>
                </div>
                <div className="d-grid">
                  <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                    Sign Up
                  </Button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/">sign in?</a>
                </p>
              </form>
            </Col>
            <Col sm>
              <img src="signup.jpg" alt="" className="signupImage" />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );

}

export default SignUp;