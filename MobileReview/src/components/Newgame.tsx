import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";                            // Libraries
import * as fs from 'fs';

import {MDBBtn,MDBCard,MDBCardBody,MDBCardImage,MDBCol,MDBContainer,MDBIcon,MDBRow,MDBTextArea,MDBTypography,} from "mdb-react-ui-kit";
import {Col,Button,Row,Container,Card,Form,FormGroup,InputGroup,} from "react-bootstrap";

const Newgame = () => {
  const [gamename, setname] = useState("");
  const [gameprice, setprice] = useState("");       // react hooks used for various reasons
  const [gamedes, setdes] = useState("");
  const [inPath, setpath] = useState("");


  const newgame = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  


    try {
      const resp = await axios.post("http://dan-project.ddns.net:8080/games", {
      
        b: gamename,
        c: gameprice,
        d: gamedes,
        e: null,
        f: 0,                                                           // Sending the data
        g: "0.0",
        h: "0",
      });
    } catch (error) {}
  };

 

 const newupload = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  
    // a local state to store the currently selected file.
    const [selectedFile, setSelectedFile] = React.useState(null);
 };
    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log("test upload");
      const formData = new FormData();
      formData.append("selectedFile", '/home/gw6wtk/hw.cpp');
      try {
        const response = await axios({
          method: "post",
          url: '/home/gw6wtk/Desktop',
          data: '/home/gw6wtk/hw.cpp',
          headers: { "Content-Type": "multipart/form-data" },
        });
      } catch(error) {
        console.log(error)
      }
    };
  
 
   

  const changename = (e: React.ChangeEvent<HTMLInputElement>) => {
    setname(e.target.value);
  };
  const changeprice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setprice(e.target.value);                                                   // Event Handlers
  };
  const changedes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setdes(e.target.value);
  };

  const changepath = (e: React.ChangeEvent<HTMLInputElement>) => {
    setpath(e.target.value);
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#add8e6" }}>
        <MDBContainer className="py-5" style={{ maxWidth: "80%" }}>
          <MDBRow className="justify-content-center">
            <MDBCol md="10" lg="8" xl="6">
              <MDBCard>
                <MDBCardBody className="p-4">
                  <div className="d-flex flex-start w-100">
                    <div className="w-100">
                      <MDBTypography tag="h5">Add new Game</MDBTypography>
                      <div>
                        <a href="">
                          <MDBIcon far icon="star text-danger me-1" />
                          <MDBIcon far icon="star text-danger me-1" />
                          <MDBIcon far icon="star text-danger me-1" />
                          <MDBIcon far icon="star text-danger me-1" />
                          <MDBIcon far icon="star text-danger me-1" />
                        </a>
                      </div>

                      <MDBTextArea
                      label="Game full name an version"
                        id="tGame Name"
                        onChange={changename}
                        value={gamename}
                        
                        rows={1}
                      />

                      <MDBTextArea
                        id="Description"
                        onChange={changedes}
                        value={gamedes}
                        label="Briefly describe this game"
                        rows={3}
                      />
                     
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Reccommende UK retail price.
                        </Form.Label>
                        <Form.Control type="text" placeholder="UK Price £" onChange={changeprice} required value = {gameprice}/>
                        <Form.Label className="text-center">
                          The file path to you image file for this game.
                        </Form.Label>
                        <Form.Control type="text" placeholder="Image filepath" onChange={changepath} required value = {inPath}/>
                      </Form.Group>

                      <div className="d-flex justify-content-between mt-3">
                        <button
                          className="btn btn-primary"
                          type="submit"
                          color="primary"
                          onClick={newgame}
                        >
                          Submit New Game
                        </button>
                         <button
                          className="btn btn-primary"
                          type="submit"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          Uplload Image
                        </button>
                      </div>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      );
    </>
  );
};

export default Newgame;
