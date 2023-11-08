
const express = require('express');
const cors = require('cors');
const { Client } = require('pg'); // Import Client from pg library
const jwtoken = require("jsonwebtoken");           //the token in use
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const tokenKey = "liarrazosia";
const tokenExpirySeconds = 900;
const app = express();
const PORT = 8080;

app.use(express.json());











/*

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
});

*/


// Postgress database connection
const db = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    database: 'MobileDB',
    password: 'root'
});



db.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database', err);
  });

  // JSON middleware
app.use(express.json());
app.use(cors());
//console.log(json(db.res));          
//------------------------------------------------- Games ----------------------------------------






// Fetch data from the database
app.get('/games', (req, res) => {
  db.query('SELECT * FROM games', (err, result) => {
    
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from database' });
    } else {
      if (result.rows.length === 0) {
        res.status(200).json('No Games in Table');
      } else {
        res.status(200).json(result.rows);
      }
    }
  });
});



app.post('/games', (req, res) => {
//const i = req.body.a;    // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
const n = req.body.b;
const p = req.body.c;
const d = req.body.d;
const av = req.body.e;
const nr = req.body.f;

  console.log("I am Here");

  console.log(req.body.d);

 
  db.query('INSERT INTO games("gameName", "gamePrice", "gameDes","avgRating","numofReviews") VALUES($1, $2, $3, $4, $5)', [n,p,d,av,nr]);


  console.log(req.body);
});

//--------------------------------------------- Reviews ----------------------------------------------------------

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
  
  db.query('INSERT INTO reviews("rvuserid","rvgameid", "comment", "latitude","longitude") VALUES($1, $2, $3, $4, $5)', [i,n,p,d,av]);
  db.query('UPDATE games SET "avgRating" = (' + new_avg_calc + ') ,"numofReviews" = (' + new_review_count + ')  WHERE gameid = 4');
  
    console.log(req.body);
  });








  app.get('/reviews', (req, res) => {
    db.query('SELECT * FROM reviews', (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data from database' });
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('No Reviews in Table');
        } else {
          res.status(200).json(result.rows);
        }
      } 
    });
  });


  //------------------------------------------------ Reviews --------------------------------------

  app.post('/reviews/show', (req, res) => {
    db.query('SELECT * FROM reviews where rvgameid =  (' + req.body.gid + ')',(err, result) => {    //gid is the incomming integer value
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data from database' });                
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('No Reviews in Table');              
        } else {
          res.status(200).json(result.rows);     
          console.log(req.body.gid);        
                                                        
      //    });           
        }
      } 
    });
  });



  app.post('/reviews/delete', (req, res) => {
    db.query('DELETE FROM reviews where rvid =  (' + req.body.drvid + ')',(err, result) => {    //drvid is the incomming integer value
      if (err) {
        res.status(500).json({ error: 'Failed to delete review' });                
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('Nothing to Delete');              
        } else {
          res.status(200).json(result.rows);     
          res.status(200).json('Review successfully Deleted');    

          console.log(req.body.gid);        
                                                        
      //    });           
        }
      } 
    });
  });







  //------------------------------------------------------- Login ----------------------------------------
/* WORKING without JWT
app.post('/login', (req, res) => {
  const u = req.body.user;
  const p = req.body.password;
  db.query('SELECT usertype FROM users WHERE (username) = ($1) AND (password) = ($2) ', [u,p], (err, result) => {    

    if (err) {
      res.status(500).json({ error: 'Username or password incorrect' });                
    } else {
      if (result.rows.length === 0) {
        res.status(200).json('Username or password incorrect');              
      } else {
        res.status(200).json(result.rows);     
      }
    } 
  });
});

*/

//----------------------------------------------------------------------------jwt ------------------------












app.post('/login', (req, res) => {
  const user = req.body.user;
  const p = req.body.password;
  db.query('SELECT usertype FROM users WHERE (username) = ($1) AND (password) = ($2) ', [user,p], (err, result) => {    
    if (err) {
      res.status(500).json({ error: 'Username or password incorrect' });                
    } else {
      if (result.rows.length === 0) {
        res.status(200).json('Username or password incorrect');              
      } else {
        const usertype = result.rows[0].usertype;   
        const token = jwtoken.sign( { usertype } , tokenKey, {
          algorithm: "HS256",
          expiresIn: tokenExpirySeconds,
        })
        res.status(200).json(token);
      }
    } 
  });
});














//----------------------------------------------- Sign-Up --------------------------------------

app.post('/signup', (req, res) => {
  //const id = req.body.a;    // the const variable is passed to the placeholder of the query, the req.body parameter is the variable set in the post 
  const un = req.body.a;
  const ue = req.body.b;
  const pw = req.body.c;
  
  const ut = "normal";
  
  console.log("I am Here");
  
    console.log(req.body.d);
  
  
    db.query('INSERT INTO users("username", "useremail", "usertype","password") VALUES($1, $2, $3, $4)', [un,ue,ut,pw]);
  
    console.log(req.body);
  });






 
/*    kept safe while developing copy

app.post('/reviews/show', (req, res) => {
    db.query('SELECT * FROM reviews where rvgameid =  (' + req.body.gid + ')',(err, result) => {    //gid is the incomming integer value
      if (err) {
        res.status(500).json({ error: 'Failed to fetch data from database' });                
      } else {
        if (result.rows.length === 0) {
          res.status(200).json('No Reviews in Table');              
        } else {
          res.status(200).json(result.rows);     
          console.log(req.body.gid);        
                                                        
      //    });           
        }
      } 
    });
  });


*/
 

app.listen(
      PORT,
      () => console.log(`bep bop i am the server i am running on http://localhost:${PORT}`)
  
      
  )
   

