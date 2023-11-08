import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";                          // Libraries
import { gameVar  } from "./global"
import { gmimage } from "./global"
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBRow, MDBTextArea, MDBTypography } from "mdb-react-ui-kit";
import { Col, Button, Row, Container, Card, Form, FormGroup, InputGroup } from "react-bootstrap";




export type Game = {
  id: number;
  gameName: string;
  gamePrice: number;
  gameDes: string;                          // Game Object 
  avgRating: number;
  numofReviews: number;
  gameImage: string;
};

  const Review = () => {
  
    const image = gmimage;
    const [comment, setcomment] = useState('');                             // React hooks 
    const [location, setLocation] = useState<{ latitude: number | null, longitude: number | null }>({ latitude: null, longitude: null });

    const changecomment = (e: React.ChangeEvent<HTMLInputElement>) => {
      setcomment(e.target.value);
    
    }
  
    function starRating(val:number){
      gameVar[3] = val
      console.log(gameVar[3]);
    } 
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;            // geolocator
          setLocation({ latitude, longitude });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

    const review = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const  resp = await axios.post("http://dan-project.ddns.net:8080/reviews", {
        
        a: 21,
        b: gameVar[2], //gameid
        c: comment,
        d: null,
        e: null,
        f: gameVar[1],
        g: gameVar[0],                              // posting the data
        h: gameVar[3],
        latitude: location.latitude,
        longitude: location.longitude,
      });
    } catch (error) {
    }
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
                  <MDBCardImage
                    className=" shadow-1-strong me-3"                   
                   src={`src/assets/${gmimage[0]}`}
                    alt="avatar"
                    width="65"
                    height="65"
                  />
                  <div className="w-100">
                    <MDBTypography tag="h5">Game review</MDBTypography>
                    <div>
                      <a href="">
                        <MDBIcon far icon="star text-danger me-1" />
                        <MDBIcon far icon="star text-danger me-1" />
                        <MDBIcon far icon="star text-danger me-1" />
                        <MDBIcon far icon="star text-danger me-1" />
                        <MDBIcon far icon="star text-danger me-1" />
                      </a>
                    </div>                  
                    <MDBTextArea id="comment_input" onChange={changecomment} value={comment} label="How many stars would you give this game (1-5)?" rows={5} />    
                    <div className="d-flex justify-content-between mt-3">   
                    <Button onClick={() => starRating(1)}>1</Button>
                    <Button onClick={() => starRating(2)}>2</Button>
                    <Button onClick={() => starRating(3)}>3</Button>
                    <Button onClick={() => starRating(4)}>4</Button>
                    <Button onClick={() => starRating(5)}>5</Button>
                    <button className="btn btn-primary" type='submit' color="primary" onClick={review}>Submit Review</button>    
                    </div>
                  </div>
                </div>             
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </>
  );
}

export default Review;
