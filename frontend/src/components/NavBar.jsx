// Navbar.js
import React, { useState } from "react";
import "./Navbar.css";
import Logo from "../assets/27002.png";
import { Link } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";

const Navbar = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "50px", height: "50px" }}
          />
        </Link>
      </div>
      <div className="NavBarButtons">
        <Link to="/" className="NavBarButton">
          Home
        </Link>
        <Link to="/page1" className="NavBarButton">
          Page 1
        </Link>
        <Link to="/page2" className="NavBarButton">
          Page 2
        </Link>
        <Link to="/page3" className="NavBarButton">
          Page 3
        </Link>
        <LoginPopUp
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
        />
      </div>
    </nav>
  );
};

export default Navbar;
