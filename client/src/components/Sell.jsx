import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Sell(){
    return (
    <div className="auth-wrapper">
    <div className="auth-inner sell">
    <Container fluid>
    <Row>
    <Col sm>
      <form encType='multipart/form-data'>
        <h3>Item Details</h3>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" placeholder="Product Name" />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" className="form-control" placeholder="Product Description"/>
        </div>
        <div className="mb-3">
          <label>Base Price</label>
          <input type="text" className="form-control" placeholder="Enter min. selling price"/>
        </div>
        <div className="mb-3">
          <label>Bid till</label>
          <input type="time" className="form-control" placeholder="Enter last bidding time"/>
          <small>Enter last biding time</small>
        </div>
        <div className="mb-3">
          <label>Upload photo</label>
          <input type="file" accept=".png,.jpeg,.jpg" className="form-control" alt="Image"/>
        </div>
        <div className="d-grid">
          <Button type="submit" href="/products" className="btn btn-primary">
            Upload
          </Button>
        </div>
       
      </form>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
    );

}

export default Sell;