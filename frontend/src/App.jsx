// App.js
import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Login from "./components/Login";
import LoginPopUp from "./components/LoginPopUp";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  // return (
  //   <>
  //     <Login />
  //   </>
  // );
  return (
    <Router>
      <div className="app">
        <Navbar
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
