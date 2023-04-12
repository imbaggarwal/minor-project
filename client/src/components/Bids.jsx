import React from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


function Bids(props){
    //use props to extract name image and price active and inactive buttons for expired bids?
    return (
    <Col lg={3} className="bids-cols">
      <Card className="product-card">
      <Card.Body>
      <Row>
        <Col><img className="card-img" src="productImages/SymphonyOfDance.jpg" alt = ""></img></Col>
        <Col>
        <Card.Title>Symphony</Card.Title>
        <Card.Text>
            Bid: 1000
            <br></br>
            <Button className="bid-btn" variant="warning">Update bid</Button>
            <Button className ="bid-btn" variant="danger">Delete bid</Button>
        </Card.Text></Col>
      </Row>
      </Card.Body>
    </Card>
    </Col>
    )
}

export default Bids;