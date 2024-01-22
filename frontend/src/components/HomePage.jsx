import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Banner from "../assets/banner.png";
import Logo from "../assets/RecipeRaveLogo.png";
import RecipeTile from "./RecipeTile";
import WindowWidthCalculator from "./WindowWidthCalculator";
import axios from "axios";
import SampleRecipes from "./SampleRecipes";

const HomePage = ({
  setIsHomePage,
  loggedInUserId,
  setIsUserLoggedIn,
  setFavourtieRecipe,
}) => {
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
        const SampleRecipesConvertedToObject = SampleRecipes.map(
          (originalRecipe) => {
            // Convert ingredients to the desired format
            const convertedIngredients = Object.entries(
              originalRecipe.ingredients
            ).map(([name, quantity]) => ({ name, quantity }));

            // Create the converted recipe object
            const convertedRecipe = {
              recipeOwnerId: originalRecipe.recipeOwnerId,
              recipeNameId: originalRecipe.recipeNameId,
              recipeName: originalRecipe.recipeName,
              ingredients: convertedIngredients,
              steps: originalRecipe.steps,
            };

            return convertedRecipe;
          }
        );
        setAllRecipes(SampleRecipesConvertedToObject);
        setIsUserLoggedIn(true);
        alert("Backend Server is Not Running, you are seeing placeholder");
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
