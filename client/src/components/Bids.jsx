import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from "react-router-dom";

function Bids(props){

  
  let navigate = useNavigate();
    //use props to extract name image and price active and inactive buttons for expired bids?
    const [show, setShow] = useState(false);
    const [showAlert, setAlert] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const[data,setData] = useState({
      productName : props.prodName,
      bid:props.bidVal,
      bidder: localStorage.getItem("userId")
    });
  
    function handleChange(event){
      const {value, name} = event.target;
      
      setData(prev =>{
        return {
          ...prev,
          [name]:value
        }
      });
      
      
     }
  
    function doSubmit(){

      if(data.bid<props.high){
        setAlert(true);
      }
      else{
        console.log(data);
        axios
      .put("/bids", data,
        {headers: {
          'Content-Type': 'application/json' 
        }}
      )
      .then(function (res) {
        console.log(res.data);
          navigate("/bids");
        
    });
      
      handleClose();
      }
      
    }

    function handleDelete(event){
      //will remove element from database
        axios
      .post("/bids", data,
        {headers: {
          'Content-Type': 'application/json' 
        }}
      )
      .then(function (res) {
        console.log(res.data);
          navigate("/bids");
        
    });
    }


    return (
      <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.prodName} Update Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
  <Toast className ="update-toast" bg="danger" show={showAlert} onClose={() => setAlert(false)} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>Min bid price is {props.high+1}</Toast.Body>
    </Toast>
  
      <form >
          <input type="Number" name = "bid"  placeholder={props.high+1} min={props.high+1} required onChange={handleChange}></input>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type ="submit" href = "/bids" variant="success" onClick={doSubmit} >
          Confirm
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>



    <Col lg={3} className="bids-cols">
      <Card className="product-card">
      <Card.Body>
      <Row>
        <Col><img className="card-img" src= {props.URL} alt = ""></img></Col>
        <Col>
        <Card.Title>{props.prodName}</Card.Title>
        <Card.Text>
            Bid: {props.bidVal}
            <br></br>
            <Button className="bid-btn" variant="warning" onClick={handleShow}>Update bid</Button>
            <Button className ="bid-btn" href ="/bids" variant="danger" onClick={handleDelete}>Delete bid</Button>
        </Card.Text></Col>
      </Row>
      </Card.Body>
    </Card>
    </Col>
    </>
  
    )
}

export default Bids;