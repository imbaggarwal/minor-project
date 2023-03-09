import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function SignUp(){

    return (
      <div className="auth-wrapper">
    <div className="auth-inner">
    <Container fluid>
    <Row>
    <Col sm>
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
        </div>
        <div className="mb-3">
          <label>Phone no.</label>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter phoneNo"
          />
        </div>
        <div className="mb-3">
          <label>OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter OTP"
          />
        </div>
        <div className="d-grid">
          <Button type="submit" href="/" className="btn btn-primary">
            Sign Up
          </Button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
      </Col>
      <Col sm>
        <img src="signup.jpg" alt="" className="signupImage"/>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
    );

}

export default SignUp;