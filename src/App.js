import React, { Component } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import Routes from './Routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <nav className="nav justify-content-around">

            <li className="nav-item active">
              <Link to="/Login">Login</Link>
            </li>
            <li className="nav-item" >
              <Link to="/BoxList">Box List</Link>
            </li>
            <li className="nav-item" >
              <Link to="/About">About ReactJS</Link>
            </li>
            <li className="nav-item" >
              <Link to="/MyNotes">Show My Notes</Link>
            </li>
            <li className="nav-item" >
              <Link to="/Users">User List</Link>
            </li>
            <li className="nav-item" >
              <Link to="/products">Product List</Link>
            </li>
            <li className="nav-item" >
              <Link to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item" >
              <Link to="/mypractice01">practice01</Link>
            </li>


          </nav>
          <Routes />
        </div>
      </BrowserRouter>

    );
  }
}

export default App;

