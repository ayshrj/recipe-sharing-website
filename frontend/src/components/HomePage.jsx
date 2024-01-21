import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Banner from "../assets/banner.png";
import Logo from "../assets/RecipeRaveLogo.png";
import RecipeTile from "./RecipeTile";
import SampleRecipes from "./SampleRecipes";
import WindowWidthCalculator from "./WindowWidthCalculator";
const HomePage = ({ setIsHomePage }) => {
  setIsHomePage(true);

  const { windowWidth } = WindowWidthCalculator();

  return (
    <>
      <div className="banner-container">
        <img src={Banner} alt="Banner" className="banner" />
        <img src={Logo} alt="Logo" className="logo-banner" draggable="false" />
      </div>
      <div className="page-content">
        <h1>Welcome to the Home Page!</h1>
        <div className="recipe-tiles-container">
          {windowWidth <= 700 ? (
            <div className="recipe-tiles-container-right">
              {SampleRecipes.map((recipe, index) => (
                <div key={index} className="right-tile">
                  <RecipeTile {...recipe} inputWidth={315} />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="recipe-tiles-container-left">
                {SampleRecipes.map(
                  (recipe, index) =>
                    index % 2 === 0 && (
                      <div key={index} className="left-tile">
                        <RecipeTile {...recipe} inputWidth={315} />
                      </div>
                    )
                )}
              </div>
              <div className="recipe-tiles-container-right">
                {SampleRecipes.map(
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
