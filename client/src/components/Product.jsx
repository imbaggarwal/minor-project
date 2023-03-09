import React from "react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
function Product(props){
    return(
        <Col lg={3} className="product-cols">
            <Row className="product-img">
                <img src={props.img} alt="prod"></img>
            </Row>
            <Row className="product-desc">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </Row>
            <Row className="product-btn">
                <span> <Button variant="primary" className="bid">Bid</Button> <Button variant="warning" className="timer">Timer</Button></span>
            </Row>
        </Col>
    )
}

export default Product;