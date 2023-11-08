/*

import Admin from "./components/Admin";
import Signup from "./components/Login";
import Login from "./components/Login";
import Newgame from "./components/Newgame";
import Review from "./components/Review";
import List from "./components/List";

function App() {
//return <div><Admin /></div>;
//return <div><Signup /></div>;
//return <div><Login /></div>;
//return <div><List /></div>;
//return <div><Review /></div>;
//return <div><Newgame /></div>;

}

export default App;

*/

/*
import Login from './components/Login';
import Signup from './components/Signup';
import List from './components/List';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login/>} /> 
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/List" element={<List/>} />
      </Routes>
  );
}
;
export default App;

import * as React from 'react';
import { Link} from 'react-router-dom';
import Main from './Main';
export default function App() {
  return (
    <>  
      <div>
        //<ul>
          /<li><Link to='/'>Home</Link></li>
          <li><Link to='/topics'>Topics</Link></li>
          <li><Link to='/settings'>Settings</Link></li>
        </ul>
        <hr />
        <Main />       
      </div>   
    </>
  )
}*/

import {Routes, Route} from 'react-router-dom';
import List from "./components/List";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Admin from "./components/Admin";
import Review from "./components/Review";
import Newgame from "./components/Newgame";



function App(){
  return (
    <Routes>
      <Route path="/" element={<Login/>} /> 
      <Route path="/Signup" element={<Signup/>} />
      <Route path="/List" element={<List/>} />
      <Route path="/Admin" element={<Admin/>} />
      <Route path="/Review" element={<Review/>} />
  <Route path="/Newgame" element={<Newgame/>} />
    </Routes>
  );
}
export default App;

