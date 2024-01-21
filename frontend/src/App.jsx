// App.js
import React, { useState } from "react";
import "./App.css";
import "./Scroll.css";
import Navbar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/HomePage";
import Page1 from "./components/Page1";
import Page2 from "./components/Page2";
import Page3 from "./components/Page3";
import Page4 from "./components/Page4";
import RecipeFormPage from "./components/RecipeFormPage";

function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [isHomePage, setIsHomePage] = useState(true);

  return (
    <Router>
      <div className={`app ${isHomePage ? "home" : ""}`}>
        <Navbar
          isUserLoggedIn={isUserLoggedIn}
          setIsUserLoggedIn={setIsUserLoggedIn}
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
          isHomePage={isHomePage}
        />
        <Routes>
          <Route path="/" element={<Home setIsHomePage={setIsHomePage} />} />
          <Route
            path="/page1"
            element={<Page1 setIsHomePage={setIsHomePage} />}
          />
          <Route
            path="/page2"
            element={<Page2 setIsHomePage={setIsHomePage} />}
          />
          <Route
            path="/page3"
            element={<Page3 setIsHomePage={setIsHomePage} />}
          />
          <Route
            path="/page4"
            element={<Page4 setIsHomePage={setIsHomePage} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
