
const bcrypt = require ("bcrypt");
const express = require('express');
const cors = require('cors');
const { Client } = require('pg');                               // Import Client from pg library
const jwtoken = require("jsonwebtoken");                        //The token in use
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const tokenKey = "liarrazosia";
const tokenExpirySeconds = 900;
const app = express();
const PORT = 8080;

app.use(express.json());




// Postgress database connection
const db = new Client({
    host: 'localhost',                                          //PSQL connection parameters
    user: 'postgres',
    port: 5432,                                                 //PSQL connection parameters
    database: 'MobileDB',
    password: 'root'                                            //PSQL connection parameters
});



db.connect()
  .then(() => {
    console.log('Connected to database');                       //Connected to dtabase
  })
  .catch((err) => {
    console.error('Error connecting to database', err);         //Failed to connect                  
  });

  // JSON middleware
app.use(express.json());
app.use(cors());
         
//------------------------------------------------- Games ----------------------------------------






// Fetch data from the database
app.get('/games', (req, res) => {                                           //Endpoint for listing all games
  db.query('SELECT * FROM games', (err, result) => {                        //Execute query
    
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from database' });  //Connection error
    } else {
      if (result.rows.length === 0) {                                         //No data
        res.status(200).json('No Games in Table');
      } else {
        res.status(200).json(result.rows);                                    //Return data
      }
    }
  });
});



app.post('/games', (req, res) => {                                                  //Endpoint for adding games
//const i = req.body.a;    // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
const n = req.body.b;
const p = req.body.c;
const d = req.body.d;
const av = req.body.e;
const nr = req.body.f;
 
db.query('INSERT INTO games("gameName", "gamePrice", "gameDes","avgRating","numofReviews") VALUES($1, $2, $3, $4, $5)', [n,p,d,av,nr]); //add new game
});

//--------------------------------------------
  )- Reviews ----------------------------------------------------------

//This funtion recieves incomming json packet, the splits the and save the appropriate field valuse to differen databases  
app.post('/reviews', (req, res) => {
  const i = req.body.a;   // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const n = req.body.b;   // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const p = req.body.c;   // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const d = req.body.latitude;   // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const av = req.body.longitude;  // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const current_rating = req.body.f;                        //The current average rating value (0.00-5.00) prior to this review
  const current_review_count = req.body.g;                  //The number of reviews this game has had before this review
  const this_rating = req.body.h;                           //The rating (0-5) given by the current reviewer
  const new_review_count = current_review_count +1;         //This maes it one more review
  const new_avg_calc = (current_rating * current_review_count + this_rating) / new_review_count; //Calculate the new average

  
  console.log("I am Here");
  )
  });








  app.get('/reviews', (req, res) => {                                                   //Endpoint for listing the reviews
    db.query('SELECT * FROM reviews', (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data from database' });          //Connection error
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('No Reviews in Table');                                  //No data
        } else {
          res.status(200).json(result.rows);                                            //Return data to list
        }
      } 
    });
  });


  //------------------------------------------------ Reviews --------------------------------------

  app.post('/reviews/show', (req, res) => {                                                         //Endpoint for listing a prticular review
    db.query('SELECT * FROM reviews where rvgameid =  (' + req.body.gid + ')',(err, result) => {    //gid is the incomming integer value
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data from database' });                      //Connection error
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('No Reviews in Table');                                              //No data
        } else {
          res.status(200).json(result.rows);                                                        //Return data to list
        }
      } 
    });
  });



  app.post('/reviews/delete', (req, res) => {                                                   //Endpoin for deleting review
    db.query('DELETE FROM reviews where rvid =  (' + req.body.drvid + ')',(err, result) => {    //drvid is the incomming integer value
      if (err) {
        res.status(500).json({ error: 'Failed to delete review' });                             //Connection error
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('Nothing to Delete');                                            //Not found
        } else {
          res.status(200).json(result.rows);                                                    //Return data
          res.status(200).json('Review successfully Deleted');                                  //Report           
        }
      } 
    });
  });




//----------------------------------------------------------------------------jwt ------------------------


app.post('/login', (req, res) => {                                                                  ///Login enpoint
  const user = req.body.user;                                                                     //Incomming parameters
  const p = req.body.password;                                                                    //Incomming parameters
  db.query('SELECT * FROM users WHERE (username) = ($1) ', [user], async (err, result) => {    
    if (err) {          
      res.status(500).json({ error: 'CONNECTION ERROR' });                                          //Check for errors
    } else {
      if (result.rows.length === 0) {                                                               //Is there any data found
        res.status(200).json('Username or password incorrect');                                     //Data found but incorrect
      } else {
              
       if ( await bcrypt.compare(p,result.rows[0].password)){                                       //Check password against encripted hash
        
        const usertype = result.rows[0].usertype;                                                   //Establish user role
        const token = jwtoken.sign( { usertype } , tokenKey, {                                      //Create JWT by signing the payload
          algorithm: "HS256",                                                                       //Algorithm used
          expiresIn: tokenExpirySeconds,                                                            //Life of the token
        })
        res.status(200).json(token);                                                                //If all is ok return the token
      }
      else {res.status(200).json("Incorrect Password")}                                             //Return password error
      }
    } 
  });
});




//----------------------------------------------- Sign-Up --------------------------------------

app.post('/signup', async (req, res) => {
  //const id = req.body.a;    // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const un = req.body.a;
  const ue = req.body.b;      //new user data
  const pw = req.body.c;
  
  const ut = "normal";
  
  console.log(req.body.d);
  const hashedpw = await bcrypt.hash(pw,10);                              //Hash password before storing in database
  
  db.query('INSERT INTO users("username", "useremail", "usertype","password") VALUES($1, $2, $3, $4)', [un,ue,ut,hashedpw]);  //Execute query
  
  });

app.listen(
      PORT,
      () => console.log(`bep bop i am the server i am running on http://localhost:${PORT}`)
  
  )
   

