import React, { useState, useEffect } from "react";
import "./NavBar.css";
import Logo from "../assets/RecipeRaveLogo.png";
import LogoEmpty from "../assets/RecipeRaveLogoEmpty.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faRobot } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faBowlFood } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import LoginPopUp from "./LoginPopUp";

const NavBar = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  loggedInUserId,
  setLoggedInUserId,
  isHomePage,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`navbar ${
        isHomePage && scrollPosition <= 0 ? "" : "scrolled"
      }`}
    >
      <div className="logo-container">
        <Link to="/">
          <img
            className={scrollPosition > 0 || !isHomePage ? Logo : LogoEmpty}
            src={scrollPosition > 0 || !isHomePage ? Logo : LogoEmpty}
            alt="Logo"
            style={{ width: "25px", height: "25px" }}
          />
        </Link>
      </div>
      <div className="NavBarButtons">
        <Link to="/" className="NavBarButton">
          <FontAwesomeIcon icon={faHome} />
        </Link>
        <Link to="/page1" className="NavBarButton">
          <FontAwesomeIcon icon={faBowlFood} />
        </Link>
        <Link to="/page2" className="NavBarButton">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        <Link to="/page3" className="NavBarButton">
          <FontAwesomeIcon icon={faStar} />
        </Link>
        {/* <Link to="/page4" className="NavBarButton">
          <FontAwesomeIcon icon={faRobot} />
        </Link> */}
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

export default NavBar;
