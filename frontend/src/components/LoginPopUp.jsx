import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./LoginPopUp.css";
import DialogueBox from "./DialogueBox";

const LoginPopUp = ({
  isUserLoggedIn,
  setIsUserLoggedIn,
  loggedInUserId,
  setLoggedInUserId,
  loginPopUpIsOpen,
  setLoginPopUpIsOpen,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginWindow, setLoginWindow] = useState(true);
  const [userNameFound, setUserNameFound] = useState(false);
  const [correctPassword, setCorrectPassword] = useState(false);
  const [submitButtonClicked, setSubmitButtonClicked] = useState(false);
  const togglePopup = () => {
    if (loginPopUpIsOpen === true) {
      setUserNameFound(false);
      setCorrectPassword(false);
      setSubmitButtonClicked(false);
      setLoginPopUpIsOpen(false);
    } else {
      setLoginPopUpIsOpen(true);
    }
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

      setSubmitButtonClicked(true);

      if (response.data.success) {
        console.log("Login successful. Welcome, " + response.data.name);
        setUserNameFound(true);
        setCorrectPassword(true);
        setLoginPopUpIsOpen(false);
        setName(response.data.name);
        setLoggedInUserId(response.data.userid);
        setIsUserLoggedIn(true);
      } else if (response.data.userFound) {
        setUserNameFound(true);
        console.log("Wrong Password");
      } else {
        setUserNameFound(false);
        console.log("No Such User Exists");
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

      setSubmitButtonClicked(true);

      console.log(name);

      if (response.data.success) {
        setUserNameFound(false);
        setLoginWindow(true);
        console.log("Registration successful");
        setLoginPopUpIsOpen(false);
        handleLogin();
      } else {
        setUserNameFound(true);
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
    setLoginPopUpIsOpen(false);
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
          <FontAwesomeIcon icon={faUser} />
        ) : (
          <FontAwesomeIcon icon={faSignInAlt} style={{ color: "grey" }} />
        )}
      </button>

      <div>
        {loginPopUpIsOpen && (
          <div className="popup-container">
            {isUserLoggedIn ? (
              <div className="popup">
                <label style={{ color: "black" }} htmlFor="username">
                  {name}
                </label>
                <button className="logout-button" onClick={handleLogout}>
                  {"Logout      "}
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ color: "white" }}
                  />
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
                  onChange={(e) => {
                    const regex = /\s/;
                    if (!regex.test(e.target.value)) {
                      setUserNameFound(false);
                      setCorrectPassword(false);
                      setSubmitButtonClicked(false);
                      setUsername(e.target.value);
                    }
                  }}
                  placeholder="Enter your username"
                  autoComplete="off"
                />

                <label style={{ color: "black" }} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    const regex = /\s/;
                    if (!regex.test(e.target.value)) {
                      setUserNameFound(false);
                      setCorrectPassword(false);
                      setSubmitButtonClicked(false);
                      setPassword(e.target.value);
                    }
                  }}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
                {submitButtonClicked && !userNameFound && (
                  <DialogueBox
                    message={"User Not Found"}
                    topDistance={"5.8rem"}
                  />
                )}

                {submitButtonClicked && userNameFound && !correctPassword && (
                  <DialogueBox
                    message={"Wrong Password"}
                    topDistance={"10.6rem"}
                  />
                )}

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
                  onChange={(e) => {
                    const regex = /\s/;
                    if (!regex.test(e.target.value)) {
                      setUserNameFound(false);
                      setCorrectPassword(false);
                      setSubmitButtonClicked(false);
                      setUsername(e.target.value);
                    }
                  }}
                  placeholder="Enter your username"
                  autoComplete="off"
                />

                <label style={{ color: "black" }} htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => {
                    const regex = /\s/;
                    if (!regex.test(e.target.value)) {
                      setUserNameFound(false);
                      setCorrectPassword(false);
                      setSubmitButtonClicked(false);
                      setPassword(e.target.value);
                    }
                  }}
                  placeholder="Enter your Password"
                  autoComplete="off"
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
                  autoComplete="off"
                />

                {submitButtonClicked && userNameFound && (
                  <DialogueBox
                    message={"Username Already Exists!"}
                    topDistance={"5.8rem"}
                  />
                )}

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
