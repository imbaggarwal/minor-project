import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavbarBar from '../src/components/Navbar.jsx';
import SignUp from '../src/components/Signup.jsx';
import Login from '../src/components/Login.jsx';
import Sell from '../src/components/Sell.jsx';
import products from '../src/products.js';
import Products from '../src/components/Products.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


//ReactDOM.render(<div><NavbarBar /><div className="auth-wrapper"><SignUp /></div></div>,document.getElementById("root"));

// function createProduct(prod){
//     return(
//         <Product 
//             key = {prod.id}
//             name = {prod.name}
//             description = {prod.description}
//             img = {prod.imgURL}
//         />);
// }

ReactDOM.render(
<Router><NavbarBar />
<Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/products" element={<Products />} />
    <Route path="/sell" element={<Sell />} />
</Routes>

{/* <Container fluid className="product-body">
    <Row>
    {products.map(createProduct)}
    </Row>
</Container> */}
</Router>,
document.getElementById("root"));