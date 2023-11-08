/*import * as React from 'react'
import { HashRouter as Router,  Link, Routes} from 'react-router-dom'
import { render } from 'react-dom';
import {Login, Signup, List} from './components;
//import './style.css';


class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/foo">Foo</Link>
            <Link to="/bar">Bar</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/foo" component={Signup} />
            <Route exact path="/bar" component={List} />
          </Switch>
        </div>
      </Router>
    );
  }
}

render(<App />, document.getElementById('root'));


import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//import '../styles/global.css'

//import Layout from '../containers/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import List from './components/List'
//import NotFound from '../pages/NotFound'

const App = () => {
  return (
    <Router>
      
        <Routes>
          <Route  path="/" element={<Login/>}/>
          <Route  path="/signup" element={<Signup/>}/>
          <Route  path="/list" element={<List/>}/>
          
        </Routes>
      
    </Router>
  );
}

export default App;
*/


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebvVitals';
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
   <BrowserRouter>
    <App />
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();