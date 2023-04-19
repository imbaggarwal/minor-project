import React from 'react';
import NavbarBar from './Navbar';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function About(){
    return(<>
        <NavbarBar />
        <div className="about-wrapper">
    <Container fluid>
    <Row>
    <Col sm>
    <h1>About Us</h1>
      <p>This is a minor project based on MERN stack and other latest web technologies.<br></br>
      This website is developed by 3rd Year CS Undergraduates of Manipal University Jaipur.</p>
      <Col className="aboutProfile1">
        <img src ="Nupur_About.jpeg" alt="" className="aboutProfileImg" onClick={() => window.open('https://www.linkedin.com/in/nupur-saboo/')}/>
        <h3 className="aboutText"  >Nupur Saboo</h3>
      </Col>
      <Col className="aboutProfile2">
        <img src ="Bhavya_About.jpeg" alt="" className="aboutProfileImg" onClick={() => window.open('https://www.linkedin.com/in/ibaggarwal/')}/>
        <h3 className="aboutText" >Bhavya Aggarwal</h3>
      </Col>
      
      
      </Col>
      <Col sm>
        <img src="about.png" alt="" className="aboutImage"/>
      </Col>
      </Row>
    </Container>
      </div>
      
    </>);
}

export default About;