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
  openRecipeWindow,
  setOpenRecipeWindow,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loginPopUpIsOpen, setLoginPopUpIsOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openPopUpWhenNotLoggedIn = () => {
    if (!isUserLoggedIn) {
      setLoginPopUpIsOpen(true);
    }
  };

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
          <FontAwesomeIcon
            icon={faHome}
            onClick={() => {
              if (openRecipeWindow) {
                setOpenRecipeWindow(false);
              }
            }}
          />
        </Link>
        <Link
          to={`${!isUserLoggedIn ? "/" : "/page1"}`}
          className="NavBarButton"
        >
          <FontAwesomeIcon
            icon={faBowlFood}
            onClick={() => {
              openPopUpWhenNotLoggedIn();
              setOpenRecipeWindow(false);
            }}
          />
        </Link>
        <Link
          to={`${!isUserLoggedIn ? "/" : "/page2"}`}
          className="NavBarButton"
        >
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => {
              openPopUpWhenNotLoggedIn();
              setOpenRecipeWindow(false);
            }}
          />
        </Link>
        <Link
          to={`${!isUserLoggedIn ? "/" : "/page3"}`}
          className="NavBarButton"
        >
          <FontAwesomeIcon
            icon={faStar}
            onClick={() => {
              openPopUpWhenNotLoggedIn();
              setOpenRecipeWindow(false);
            }}
          />
        </Link>
        {/* <Link to="/page4" className="NavBarButton">
          <FontAwesomeIcon icon={faRobot} />
        </Link> */}
        <LoginPopUp
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
          loginPopUpIsOpen={loginPopUpIsOpen}
          setLoginPopUpIsOpen={setLoginPopUpIsOpen}
        />
      </div>
    </nav>
  );
};

export default NavBar;
