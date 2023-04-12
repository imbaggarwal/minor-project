import React from "react";
import {useEffect, useState} from 'react';
//import products from '../products.js';
import Product from './Product.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NavbarBar from './Navbar.jsx';


function Products(){
    //console.log(localStorage.getItem("user"));
    const[products,setProduct] = useState([{}]);
    useEffect(()=>{
        const fetchData = async() =>{
        const result = await axios.get("/products");
        setProduct(result.data);
    };
    fetchData();
    
    },[]);
    
  
return(<><NavbarBar />
<Container fluid className="product-body">
    <div className="selling">
        <Button variant="danger" size="lg" href="/sell" classNam="mb-2 selling-btn">Sell</Button>
    </div>
    
    <Row>
    {products.map((prod)=>{
    return(
        <Product 
            key = {prod._id}
            name = {prod.name}
            description = {prod.description}
            img = {prod.image}
            price = {prod.price}
        />)})}
    </Row>
</Container></>);
}

export default Products;