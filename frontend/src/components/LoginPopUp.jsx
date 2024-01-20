// LoginPopUp.js
import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./LoginPopUp.css";

const LoginPopUp = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  loggedInUserId,
  setLoggedInUserId,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loginWindow, setLoginWindow] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleNewUserClick = () => {
    setLoginWindow(!loginWindow);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        console.log("Login successful. Welcome, " + response.data.name);
        // setName(response.data.name);
        // setUserRecipes([]);
        setIsOpen(false);
        setName(response.data.name);
        setLoggedInUserId(response.data.userid);
        setIsUserLoggedIn(true);
      } else {
        console.log("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        name,
      });

      console.log(name);

      if (response.data.success) {
        setLoginWindow(true);
        console.log("Registration successful");
        setIsOpen(false);
        handleLogin();
      } else {
        console.log("Registration failed. " + response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleLogout = async () => {
    setUsername("");
    setPassword("");
    setIsUserLoggedIn(false);
    setIsOpen(false);
    setLoggedInUserId("");
    setName("");
  };

  return (
    <>
      <button
        style={{ marginRight: 30 }}
        className="login-icon"
        onClick={togglePopup}
      >
        {isUserLoggedIn ? (
          <FontAwesomeIcon icon={faSignOutAlt} />
        ) : (
          <FontAwesomeIcon icon={faSignInAlt} />
        )}
      </button>

      <div>
        {isOpen && (
          <div className="popup-container">
            {isUserLoggedIn ? (
              <div className="popup">
                <label style={{ color: "black" }} htmlFor="username">
                  {name}
                </label>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : loginWindow ? (
              <div className="popup">
                <label style={{ color: "black" }} htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />

                <label style={{ color: "black" }} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

                <button className="login-button" onClick={handleLogin}>
                  Login
                </button>

                <p
                  style={{ color: "black", fontSize: 10, cursor: "pointer" }}
                  onClick={handleNewUserClick}
                >
                  New User? Register!
                </p>
              </div>
            ) : (
              <div className="popup">
                <label style={{ color: "black" }} htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />

                <label style={{ color: "black" }} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                />

                <label style={{ color: "black" }} htmlFor="username">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your Name"
                />

                <button className="login-button" onClick={handleRegister}>
                  Register
                </button>
                <p
                  style={{ color: "black", fontSize: 10, cursor: "pointer" }}
                  onClick={handleNewUserClick}
                >
                  Already A User? Login!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LoginPopUp;
