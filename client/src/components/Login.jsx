import React,{useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function Login(){

  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const[data,setData] = useState({
    username:"",
    password:"" 
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
  
  //TODO: can customize error message if needed
  function handleSubmit(event){
    event.preventDefault();
        axios
      .post("/", data,
        {headers: {
          'Content-Type': 'application/json' 
        }}

      )
      .then(function (res) {
        console.log(res.data);
        if(res.data === "error"){
            setShow(true);
        }else{
          localStorage.setItem('user', res.data);
          navigate("/products");
        };
    });

      }
  // console.log("show:"+show);
 
  // useEffect(() => {
  //   const data = window.sessionStorage.getItem('MY_ALERT_STATE');
  //   console.log(data);
  //   if ( data !== null ) setShow(JSON.parse(data));
    
  // }, []);

  // useEffect(() => {
  //   window.sessionStorage.setItem('MY_ALERT_STATE', JSON.stringify(show));
  // }, [show]);
  
    return (
    <div className="auth-wrapper">
    <div className="auth-inner login">
    
    <Alert variant="danger" show={show} onClose={() => setShow(false)} dismissible>
      <Alert.Heading>Incorrect User name or password</Alert.Heading>
      <p>
        If the error persists try Signing-up.
      </p>
      <hr />
    </Alert>
    
    <Container fluid>
    <Row>
    <Col sm>
      <form>
        <h3>Log In</h3>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name = "username" className="form-control" placeholder="Enter email" required onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name = "password" className="form-control" placeholder="Enter password" required onChange={handleChange}/>
        </div>
        <div className="d-grid">
          <Button type="submit" className="btn btn-primary"  onClick={handleSubmit}>Log in</Button>
        </div>
        <p className="forgot-password text-right">
          Not yet registered <a href="/signup">Sign up?</a>
        </p>
      </form>
      </Col>
      <Col sm>
        <img src="login.png" alt="" className="loginImage"/>
      </Col>
      </Row>
    </Container>
      </div>
      </div>
    );

}

export default Login;