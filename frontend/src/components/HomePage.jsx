import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Banner from "../assets/banner.png";
import Logo from "../assets/RecipeRaveLogo.png";
import RecipeTile from "./RecipeTile";
import WindowWidthCalculator from "./WindowWidthCalculator";
import axios from "axios";
import SampleRecipes from "./SampleRecipes";
import SampleMyRecipes from "./SampleMyRecipes";
import RecipePagePopUp from "./RecipePagePopUp";

const HomePage = ({
  setIsHomePage,
  loggedInUserId,
  setIsUserLoggedIn,
  setOwnedRecipe,
  setFavourtieRecipe,
  isHomePage,
  openRecipeWindow,
  setOpenRecipeWindow,
  isUserLoggedIn,
}) => {
  setIsHomePage(true);
  const [allRecipes, setAllRecipes] = useState([]);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const { windowWidth } = WindowWidthCalculator();
  const [clickedRecipeId, setClickedRecipeId] = useState("");
  const [recipeInfo, setRecipeInfo] = useState({});
  useEffect(() => {
    const retrieveAllRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipes");

        console.log("LogginInUserIdIsSent", loggedInUserId);

        if (response.data.success) {
          setAllRecipes(response.data.allRecipes);
          console.log(response.data.allRecipes);
        } else {
          setShowErrorMessage(true);
          setTimeout(() => {
            setShowErrorMessage(false);
          }, 5000);

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
        const SampleMyRecipesConvertedToObject = SampleMyRecipes.map(
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
        setOwnedRecipe(SampleMyRecipesConvertedToObject);

        setIsUserLoggedIn(true);
        setShowErrorMessage(true);
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 5000);

        console.error("Error retrieving user recipes:", error);
      }
    };

    retrieveAllRecipes();
  }, [loggedInUserId]);

  const retrieveRecipeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/recipes/recipeid",
        {
          params: {
            clickedRecipeId,
          },
        }
      );

      console.log("RecipeId", clickedRecipeId);

      if (response.data.success) {
        setRecipeInfo(response.data.recipeInfo);
        setOpenRecipeWindow(true);
        console.log("recipes added", recipeInfo);
      } else {
        alert("Error retrieving user recipes. " + response.data.message);
      }
    } catch (error) {
      console.error("Error retrieving user recipes:", error);
    }
  };

  return (
    <>
      <div className={`error-message ${showErrorMessage ? "" : "hidden"}`}>
        Backend Server is Not Running, you are seeing placeholders
      </div>
      {openRecipeWindow ? (
        <div>
          <RecipePagePopUp
            data={recipeInfo}
            isHomePage={isHomePage}
            setIsHomePage={setIsHomePage}
            setOpenRecipeWindow={setOpenRecipeWindow}
            loggedInUserId={loggedInUserId}
            isUserLoggedIn={isUserLoggedIn}
          />
        </div>
      ) : (
        <>
          <div className="banner-container">
            <img src={Banner} alt="Banner" className="banner" />
            <img
              src={Logo}
              alt="Logo"
              className="logo-banner"
              draggable="false"
            />
          </div>
          <div className="page-content">
            <div className="recipe-tiles-container">
              {windowWidth <= 700 ? (
                <div className="recipe-tiles-container-right">
                  {allRecipes.map((recipe, index) => (
                    <div key={index} className="right-tile">
                      <RecipeTile
                        {...recipe}
                        inputWidth={315}
                        setClickedRecipeId={setClickedRecipeId}
                        retrieveRecipeData={retrieveRecipeData}
                      />
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
                            <RecipeTile
                              {...recipe}
                              inputWidth={315}
                              setClickedRecipeId={setClickedRecipeId}
                              retrieveRecipeData={retrieveRecipeData}
                            />
                          </div>
                        )
                    )}
                  </div>
                  <div className="recipe-tiles-container-right">
                    {allRecipes.map(
                      (recipe, index) =>
                        index % 2 === 1 && (
                          <div key={index} className="right-tile">
                            <RecipeTile
                              {...recipe}
                              inputWidth={315}
                              setClickedRecipeId={setClickedRecipeId}
                              retrieveRecipeData={retrieveRecipeData}
                            />
                          </div>
                        )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default HomePage;
