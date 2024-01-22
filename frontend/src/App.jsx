// App.js
import React, { useState } from "react";
import "./App.css";
import "./Scroll.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import RecipeFormPage from "./components/RecipeFormPage";
import Login from "./components/Login";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);
  const [ownedRecipe, setOwnedRecipe] = useState([]);
  const [favourtieRecipe, setFavourtieRecipe] = useState([]);

  return (
    <Router>
      <div className={`app ${isHomePage ? "home" : ""}`}>
        <NavBar
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
          isHomePage={isHomePage}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setIsHomePage={setIsHomePage}
                loggedInUserId={loggedInUserId}
                setIsUserLoggedIn={setIsUserLoggedIn}
                setFavourtieRecipe={setFavourtieRecipe}
              />
            }
          />
          <Route
            path="/page1"
            element={
              <Page1
                setIsHomePage={setIsHomePage}
                loggedInUserId={loggedInUserId}
                ownedRecipe={ownedRecipe}
                setOwnedRecipe={setOwnedRecipe}
              />
            }
          />
          <Route
            path="/page2"
            element={
              <Page2
                setIsHomePage={setIsHomePage}
                loggedInUserId={loggedInUserId}
              />
            }
          />
          <Route
            path="/page3"
            element={
              <Page3
                setIsHomePage={setIsHomePage}
                loggedInUserId={loggedInUserId}
              />
            }
          />
          <Route
            path="/page4"
            element={
              <Page4
                setIsHomePage={setIsHomePage}
                loggedInUserId={loggedInUserId}
                favourtieRecipe={favourtieRecipe}
                setFavourtieRecipe={setFavourtieRecipe}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
