import React from 'react';
import Bids from '../components/Bids.jsx'
import NavbarBar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function UserBids(){
    //make it functional
    return(
        <>
               <NavbarBar />
               <Container fluid className="bids-content">
               <h1>My Bids</h1>
               <Row>
               <Bids />
               <Bids />
               <Bids />
               <Bids />
               <Bids />
               <Bids />
               </Row>
             
               </Container>
              
          
              
        </>
     
    )
}

export default UserBids;