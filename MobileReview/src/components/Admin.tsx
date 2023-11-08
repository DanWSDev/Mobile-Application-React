import React from "react";
import { MDBRow, MDBCol } from "mdb-react-ui-kit";
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button"; // Libraries
import { Link, useNavigate } from "react-router-dom";
import { userRole } from "./global";

export type Review = {
  id: number;
  comment: string; // Review Object Paramenteters
  rvuserid: string;
  latitude: number;
  longitude: number;
  rvid: number;
};
function setRole() {
  userRole[0] = "admin";
}
let rvdel = 0;
async function DeleteReview(revid: number) {
  console.log(revid);
  try {
    const resp = await axios.post(
      "http://dan-project.ddns.net:8080/reviews/delete",
      {
        drvid: revid, // Delete review
      }
    );
    console.log(resp.data);
  } catch (error) {}
}

function List() {
  const [reviews, setReviews] = useState<Review[] | null>();
  useEffect(() => {
    const url = "http://dan-project.ddns.net:8080/reviews"; // List Review
    axios.get(url).then((res) => {
      setReviews(res.data);
    });
  }, []);

  const handleViewMap = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`; // Show Map
    window.open(url, "_blank");
  };

  const [selectedreview, setSelectedreview] = useState(-1);

  return (
    <>
      <div className="d-flex justify-content-center">
        <Link to={`/Newgame`}>
          <button className="btn btn-primary">Add Game</button>
        </Link>
        <Link to={`/List`}>
          <button className="btn btn-primary">List of Games</button>
        </Link>
      </div>
      <h1>Reviews</h1>

      <ul className="list-group mx-auto text-center" style={{ maxWidth: "35" }}>
        {reviews?.map((review, index) => (
          <li
            className={
              selectedreview === index
                ? "list-group-item active"
                : "list-group-item"
            }
            key={review.id}
          >
            <h3>{review.comment}</h3>
            <p>{review.rvid}</p>

            <Button
              onClick={() => handleViewMap(review.latitude, review.longitude)}
            >
              View Map
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
