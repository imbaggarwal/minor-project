import React ,{ useState,useRef, useEffect }from "react";
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Countdown from 'react-countdown';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
function Product(props){
//------------------------bid button pop up----------------------------------
  const [show, setShow] = useState(false);
  const [showAlert, setAlert] = useState(false);
  const[disable, setDisable] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[data,setData] = useState({
    productName : props.name,
    bid:0,
    bidder: localStorage.getItem("userId"),
    image:props.img
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
      setDisable(true);
      axios
    .post("/products", data,
      {headers: {
        'Content-Type': 'application/json' 
      }}
    )
    .then(res => console.log("sent"+res))
    .catch(err => console.log("dint"+err));
    handleClose();
    }
    
  }
//---------------------------------------------------------------------------

//-----------------------timer button functions------------------------------


//---------------------------------------------------------------------------
    return(
        <>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.name} Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
    <Toast className ="price-toast" bg="danger" show={showAlert} onClose={() => setAlert(false)} delay={3000} autohide>
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


        <Col lg={3} className="product-cols">
            <Row className="product-img">
                <img src={props.img} alt="prod"></img>
            </Row>
            <Row className="product-desc">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
            </Row>
            <Row className="product-btn">
                <span> <Button variant="primary" className="bid" onClick={handleShow} disabled={disable}>{props.price}</Button> 
                <Button variant="warning" className="timer"><Countdown date={Date.now()+86400000}/></Button>
                </span>
            </Row>
        </Col>

        </>
    )
}

export default Product;