// RecipePage.js
import React, { useState } from "react";
import "./RecipePagePopUp.css";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from "axios";
const RecipePagePopUp = ({
  data,
  isHomePage,
  setIsHomePage,
  setOpenRecipeWindow,
  loggedInUserId,
  isUserLoggedIn,
}) => {
  const { recipeName, ingredients, steps, recipeNameId } = data;
  const [isFavourite, setIsFavourite] = useState(false);

  setIsHomePage(false);

  function toPascalCaseWithSpaces(str) {
    let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
  }

  const handleFavourite = async () => {
    if (!isFavourite && isUserLoggedIn) {
      try {
        console.log(loggedInUserId);
        const response = await axios.post(
          "http://localhost:5000/user/likeRecipe",
          {
            recipeNameId,
            recipeName,
            loggedInUserId,
          }
        );

        setIsFavourite(true);

        if (response.data.success) {
          console.log("Added");
        } else {
          console.log("Registration failed. " + response.data.message);
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    } else {
      console.log(
        "isFavourite: ",
        isFavourite,
        "isUserLoggedIn: ",
        isUserLoggedIn
      );
    }
  };

  return (
    <>
      <div
        className="recipe-container-front-page"
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "60px",
          margin: "auto",
          position: "relative",
        }}
      >
        <div className="left-border-front-page"></div>

        <div className="star-icon">
          <i
            className={`${isFavourite ? "fas" : "far"} } fa-star`}
            onClick={handleFavourite}
          ></i>
        </div>

        <button
          className="close-button"
          onClick={() => {
            setIsHomePage(true);
            setOpenRecipeWindow(false);
          }}
        >
          <i className="far fa-times-circle"></i>
        </button>

        <h1 className="recipe-name-opened">{recipeName}</h1>

        <div className="ingredients-container">
          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>
                {toPascalCaseWithSpaces(ingredient.name)} -{" "}
                {ingredient.quantity}
              </li>
            ))}
          </ul>
        </div>

        <div className="steps-container">
          <h2>Steps:</h2>
          <ol>
            {steps.map((step, index) => (
              <React.Fragment key={index}>
                <li>{step}</li>
                {index < steps.length - 1 && (
                  <div className="steps-border"></div>
                )}
              </React.Fragment>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default RecipePagePopUp;
