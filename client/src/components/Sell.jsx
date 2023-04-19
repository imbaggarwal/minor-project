import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavbarBar from './Navbar';



function Sell(){

    return (
    <>
    <NavbarBar/>
    <div className="auth-wrapper">
    <div className="auth-inner sell">
    <Container fluid>
    <Row>
    <Col sm>
      <form encType='multipart/form-data'  method ="post" >
        <h3>Item Details</h3>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name = "name" className="form-control" placeholder="Product Name" required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" name = "description" className="form-control" placeholder="Product Description" />
        </div>
        <div className="mb-3">
          <label>Base Price</label>
          <input type="number" name = "price" className="form-control" placeholder="Enter min. selling price" required />
        </div>
        <div className="mb-3">
          <label>Upload photo</label>
          <input type="file"  name = "photo" id ="photo" accept="image/*" className="form-control" alt="Image" required />
        </div>
        <div className="d-grid sell-btn">
        <span>
        <Button type="submit"  className="btn btn-primary uploadBtn"> Upload </Button>
        <Button type="submit"  className="btn btn-danger cancelBtn" href="/products"> Cancel </Button>
        </span>
        </div>
       
      </form>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
      </>
    );

}

export default Sell;