import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login(){

    return (
    <div className="auth-wrapper">
    <div className="auth-inner login">
    <Container fluid>
    <Row>
    <Col sm>
      <form>
        <h3>Log In</h3>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter email" />
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
          <Button type="submit" href="/products" className="btn btn-primary">
            Log in
          </Button>
        </div>
        <p className="forgot-password text-right">
          Not yet registered <a href="/signup">Sign up?</a>
        </p>
      </form>
      </Col>
      <Col sm>
        <img src="login.png" alt="" className="loginImage"/>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
    );

}

export default Login;