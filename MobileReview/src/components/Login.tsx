import axios from "axios";
import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, FormGroup } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { Cookies } from "react-cookie";                                 //Import libraries required
//import { isExpired, decodeToken } from "react-jwt";
import * as jose from 'jose';

const cookies = new Cookies();

const Login = () => {
  const [user, setuser] = useState('');
  const [password, setpassword] = useState('');                         //Use react hooks for various reasons
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  
  const tokenKey = "liarrazosia"  ;
  const encoder = new TextEncoder();
  const publicKey = encoder.encode(tokenKey);
  

  const login = async (e: React.FormEvent<HTMLFormElement>) => {                      //Event handler
    e.preventDefault();

    try{
      const res = await axios.post("http://dan-project.ddns.net:8080/login", {user:user , password:password})

      const token = res.data;
      try{
          const { payload, protectedHeader } = await jose.compactVerify(token, publicKey)     // Varify JWT token against secret
          cookies.set('token', token);
          const detail = JSON.parse((new TextDecoder().decode(payload)))                      //Decode and parse the token into usefull data
          const role = detail.usertype;
          role === 'admin' && navigate("./Admin");                                            //Route to the next page depending on user privileges                                    
          role=== 'normal' && navigate("./List");                                             //Route to the next page depending on user privileges
          role && setErrMsg("Successful Login as " + role + " user!");                        //Report successful login
          role && setErrMsg("Incorrect username or password");                                //Report unsuccessful login
        }
      catch (error)
        {
          console.log("Invalid Key")                                                          //Report invalid key if secrets non't match
        }
      }
      catch (error)
      {
        setErrMsg('Incorrect username/password');                                             //Report unsuccessful login
      }
  };

const changeuser = (e: React.ChangeEvent<HTMLInputElement>) => {                              //Event handler
  setuser(e.target.value);
}

const changepassword = (e: React.ChangeEvent<HTMLInputElement>) => {                          
  setpassword(e.target.value);                                                                 //Event handler
}
  return (
  <>
        <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">         
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Daniel's Mobile</h2>
                  <p className=" mb-5">Please enter your login and password!</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={changeuser} required value = {user}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label> 
                      <Form.Control type="password" onChange={changepassword} required value = {password}/>    
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                      <button variant="primary" type='submit' onClick={login}>Login</button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                            
                      Don't have an account?{" "}
                      
                        <p><Link to="/Signup">Sign up </Link></p>
                       
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
        </>       
  );   
} 
export default Login;