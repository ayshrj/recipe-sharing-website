import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Banner from "../assets/banner.png";
import Logo from "../assets/RecipeRaveLogo.png";
import RecipeTile from "./RecipeTile";
import WindowWidthCalculator from "./WindowWidthCalculator";
import axios from "axios";
import SampleRecipes from "./SampleRecipes";

const HomePage = ({ setIsHomePage, loggedInUserId }) => {
  setIsHomePage(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const { windowWidth } = WindowWidthCalculator();

  useEffect(() => {
    const retrieveAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");

        console.log("LogginInUserIdIsSent", loggedInUserId);

        if (response.data.success) {
          setAllRecipes(response.data.allRecipes);
          console.log(response.data.allRecipes);
        } else {
          alert("Error retrieving user recipes. " + response.data.message);
        }
      } catch (error) {
        console.error("Error retrieving user recipes:", error);
      }
    };

    retrieveAllRecipes();
  }, [loggedInUserId]);

  return (
    <>
      <div className="banner-container">
        <img src={Banner} alt="Banner" className="banner" />
        <img src={Logo} alt="Logo" className="logo-banner" draggable="false" />
      </div>
      <div className="page-content">
        <h1 onClick={console.log(typeof allRecipes)}>
          Welcome to the Home Page!
        </h1>
        <div className="recipe-tiles-container">
          {windowWidth <= 700 ? (
            <div className="recipe-tiles-container-right">
              {allRecipes.map((recipe, index) => (
                <div key={index} className="right-tile">
                  <RecipeTile {...recipe} inputWidth={315} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="recipe-tiles-container-left">
                {allRecipes.map(
                  (recipe, index) =>
                    index % 2 === 0 && (
                      <div key={index} className="left-tile">
                        <RecipeTile {...recipe} inputWidth={315} />
                      </div>
                    )
                )}
              </div>
              <div className="recipe-tiles-container-right">
                {allRecipes.map(
                  (recipe, index) =>
                    index % 2 === 1 && (
                      <div key={index} className="right-tile">
                        <RecipeTile {...recipe} inputWidth={315} />
                      </div>
                    )
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
