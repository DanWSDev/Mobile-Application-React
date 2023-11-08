
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form, FormGroup } from "react-bootstrap";
import React, { Component } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userRole } from "./global"


const Signup = () => {
const utype = userRole[0];
const [user, setuser] = useState('');
const [email, setemail] = useState('');
const [password1, setpassword1] = useState('');
const [password2, setpassword2] = useState('');
const [errMsg, setErrMsg] = useState('');

const signup = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

if (password1 === password2) { 
  setErrMsg("Passwords match");
try{
  const resp = await axios.post("http://dan-project.ddns.net:8080/signup", {a:user ,b:email,d:utype,c:password1})
   
    //resp.data[0].usertype && setErrMsg("Successful Login as " + resp.data[0].usertype + " user!");
    //!resp.data[0].usertype && setErrMsg("Incorrect username or password");
}
  catch (error)
  {
    //setErrMsg('Incorrect username/password');
  }
}
else
{
  setErrMsg("Passwords do not match");
}
};

const changeuser = (e: React.ChangeEvent<HTMLInputElement>) => {
  setuser(e.target.value);
}
const changeemail = (e: React.ChangeEvent<HTMLInputElement>) => {
  setemail(e.target.value);
}
const changepassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
  setpassword1(e.target.value);
}
const changepassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
  setpassword2(e.target.value);
  console.log()
}

  return (
    <React.Fragment>
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-uppercase ">Create an account</h2>
                  <p className=" mb-5">Please enter your chosen username </p>
                  <div className="mb-3">
                    <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Username" onChange={changeuser} value = {user}/>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Email address
                        </Form.Label>
                         <Form.Control type="email" placeholder="Email address" onChange={changeemail} required value = {email}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Please enter a Password</Form.Label>
                        <Form.Control type="password" onChange={changepassword1} required value = {password1}/> 
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Please verify your Password</Form.Label>
                        <Form.Control type="password" onChange={changepassword2} required value = {password2}/> 
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        
                      </Form.Group>
                      <div className="d-grid">
                      <button variant="primary" type='submit' onClick={signup}>Create account</button>                         
                    </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                      
                      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                      <p><Link to="/">Back</Link></p>
                     
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
    </React.Fragment>
  );

  }
export default Signup;