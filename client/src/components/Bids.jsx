import React,{useState} from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import Modal from 'react-bootstrap/Modal';

function Bids(props){
    //use props to extract name image and price active and inactive buttons for expired bids?
    const [show, setShow] = useState(false);
    const [showAlert, setAlert] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const[data,setData] = useState({
      productName : props.name,
      bid:0,
      bidder: localStorage.getItem("user")
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
      console.log("submitted");
      if(data.bid<props.price){
        setAlert(true);
      }
      else{
      //   axios
      // .post("/bid", data,
      //   {headers: {
      //     'Content-Type': 'application/json' 
      //   }}
      // )
      // .then(res => console.log("sent"+res))
      // .catch(err => console.log("dint"+err));
      handleClose();
      }
      
    }

    function handleDelete(event){
      //will remove element from database
    }


    return (
      <>
      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.name} Update Bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      
  <Toast className ="update-toast" bg="danger" show={showAlert} onClose={() => setAlert(false)} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Error</strong>
      </Toast.Header>
      <Toast.Body>Min bid price is {props.price}</Toast.Body>
    </Toast>
  
      <form >
          <input type="Number" name = "bid"  placeholder={props.price} min={props.price} required onChange={handleChange}></input>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button type ="submit" variant="success" onClick={doSubmit} >
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
        <Col><img className="card-img" src="productImages/SymphonyOfDance.jpg" alt = ""></img></Col>
        <Col>
        <Card.Title>Symphony</Card.Title>
        <Card.Text>
            Bid: 1000
            <br></br>
            <Button className="bid-btn" variant="warning" onClick={handleShow}>Update bid</Button>
            <Button className ="bid-btn" variant="danger" onClick={handleDelete}>Delete bid</Button>
        </Card.Text></Col>
      </Row>
      </Card.Body>
    </Card>
    </Col>
    </>
  
    )
}

export default Bids;