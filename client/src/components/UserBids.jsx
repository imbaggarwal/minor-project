import React from 'react';
import {useEffect, useState} from 'react';
import Bids from '../components/Bids.jsx'
import NavbarBar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';

function UserBids(){
    //make it functional
    const[bids,setBids] = useState([{}]);
    useEffect(()=>{
        const fetchData = async() =>{
        const result = await axios.get("/bids");
        setBids(result.data);
    };
    fetchData();
    
    },[]);

    return(
        <>
               <NavbarBar />
               <Container fluid className="bids-content">
               <h1>My Bids</h1>
               <Row>
               {bids.map((bid)=>{
                    return(
                    <Bids 
                        URL={bid.productIMG}
                        prodName={bid.productName}
                        bidVal={bid.bidPrice}
                        high = {bid.highBid}
                    />)})}
               </Row>
             
               </Container>
              
          
              
        </>
     
    )
}

export default UserBids;