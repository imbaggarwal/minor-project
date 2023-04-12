import React,{useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import {useNavigate} from "react-router-dom";


function SignUp(){

  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [data,setData] = useState({
    name:"",
    username:"",
    phone:"",
    password:"",
  });

  //console.log("show:"+show);
 
  // useEffect(() => {
  //   const data = window.sessionStorage.getItem('MY_ALERT_STATE');
  //   console.log(data);
  //   if ( data !== null ) setShow(JSON.parse(data));
    
  // }, []);

  // useEffect(() => {
  //   window.sessionStorage.setItem('MY_ALERT_STATE', JSON.stringify(show));
  // }, [show]);

  function handleChange(event){
    const {value, name} = event.target;
    
    setData(prev =>{
      return {
        ...prev,
        [name]:value
      }
    });
  }

  function handleSubmit(event){
    event.preventDefault();
    axios
  .post("/signup", data,
    {headers: {
      'Content-Type': 'application/json' 
    }}
  )
  .then(function (res) {
    console.log(res.data);
    if(res.data === "found"){
        setShow(true);
    }else{
      navigate("/");
    };
});

  }
    

    return (
      <div className="auth-wrapper">
    <div className="auth-inner">
    
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
      <Alert.Heading>User Already Exists</Alert.Heading>
      <p>
        A user with this email address already exists in the database.
        Use a different email address or try logging in.
      </p>
      <hr />
    </Alert>
    
    <Container fluid>
    <Row>
    <Col sm>
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name = "name" className="form-control" placeholder="Name" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name = "username" className="form-control" placeholder="Enter email" required onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Phone no.</label>
          <input type="tel" name = "phone" className="form-control" placeholder="Enter phoneNo" required onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" placeholder="Enter password" pattern="(?=.*\d)(?=.*[\W_]).{8,}" required onChange={handleChange}/>
          <small>Password should have atleast one special character and one number</small>
        </div>
        <div className="d-grid">
          <Button type="submit"  className="btn btn-primary" onClick={handleSubmit}>
            Sign Up
          </Button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/">sign in?</a>
        </p>
      </form>
      </Col>
      <Col sm>
        <img src="signup.jpg" alt="" className="signupImage"/>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
    );

}

export default SignUp;