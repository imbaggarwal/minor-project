import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NavbarBar from '../src/components/Navbar.jsx';
import SignUp from '../src/components/Signup.jsx';
import Login from '../src/components/Login.jsx';
import Sell from '../src/components/Sell.jsx';
import Products from '../src/components/Products.jsx';
import UserBids from '../src/components/UserBids.jsx';
import About from '../src/components/About.jsx'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';



ReactDOM.render(
<Router>
<Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/products" element={<Products />} />
    <Route path="/sell" element={<Sell />} />
    <Route path="/bids" element = {<UserBids />}/>
    <Route path="/about" element = {<About />}/>
    </Routes>

</Router>,
document.getElementById("root"));

