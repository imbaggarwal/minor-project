import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function NavbarBar() {

  //const[showSection, setShowSection] = useState(false);
  let navigate = useNavigate();

//  useEffect(() => {
//     if(localStorage.getItem("user")!=="user"){
//       setShowSection(true);
//     }
//     else{
//       setShowSection(false);
//     }}, []);

  function handleLogOut(event){
    event.preventDefault();
    localStorage.setItem('user',"user");
    navigate("/");
  }
  return (
    <>
        <Navbar expand='md' className="mb-3 navbar" fixed="top" >
          <Container fluid>
            <Navbar.Brand href="/products" className="navBar-text">Auctioning</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/products" className="navBar-text">Home</Nav.Link>
                  <Nav.Link href="/about" className="navBar-text">About</Nav.Link>
                  <NavDropdown 
                    title={"Hi "+localStorage.getItem("user")}
                    
                    id={`offcanvasNavbarDropdown-expand-md`}
                    className="navBar-text"
                  >
                    
                    <NavDropdown.Item href="/bids">
                      My Bids
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogOut}>
                      Log-out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    
    </>
  );
}


export default NavbarBar;