import React from "react";
import products from '../products.js';
import Product from './Product.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function createProduct(prod){
    return(
        <Product 
            key = {prod.id}
            name = {prod.name}
            description = {prod.description}
            img = {prod.imgURL}
        />);
}

function Products(){
return(<Container fluid className="product-body">
    <div className="selling">
        <Button variant="danger" size="lg" href="/sell" classNam="selling-btn">Sell</Button>
    </div>
    <Row>
    {products.map(createProduct)}
    </Row>
</Container>);
}

export default Products;