import React from 'react';
import {BrowserRouter as Router, Routes, Route}from "react-router-dom"
import './App.css';
import { Nav } from './Components/Nav';
import {Login} from './Pages/Login';
import {Signup} from './Pages/Signup';
import { Home } from './Pages/Home';

function App() {
  return (
    <div className="App">
      <Router> 
      <Nav/>
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/signup" element = {<Signup />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
