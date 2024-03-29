// RecipeList.js
import React, { useState } from "react";
import RecipePage from "./RecipePage";
import "./RecipeList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const RecipeList = ({ recipes, isHomePage, title }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe((prevSelectedRecipe) => {
      // Toggle: If the clicked recipe is already selected, close it; otherwise, open it.
      return prevSelectedRecipe &&
        prevSelectedRecipe.recipeNameId === recipe.recipeNameId
        ? null
        : recipe;
    });
  };

  return (
    <div className="recipe-list-container">
      <div className="left-border"></div>
      <h1 className="recipe-list-title">{title}</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <React.Fragment key={recipe.recipeNameId}>
            <div
              className="recipe-name"
              onClick={() => handleRecipeClick(recipe)}
              style={{ display: "flex" }}
            >
              <div style={{ display: "flex" }}>
                {/* <div
                  className={`hamburger ${
                    selectedRecipe &&
                    selectedRecipe.recipeNameId === recipe.recipeNameId
                      ? "open"
                      : ""
                  }`}
                >
                  <div className="bar"></div>
                  <div className="bar"></div>
                  <div className="bar"></div>
                </div> */}
                {/* {selectedRecipe &&
                selectedRecipe.recipeNameId === recipe.recipeNameId ? (
                  <FontAwesomeIcon
                    icon={faEllipsis}
                    style={{ width: "24px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEllipsisVertical}
                    style={{ width: "24px" }}
                  />
                )}{" "} */}
                {selectedRecipe &&
                selectedRecipe.recipeNameId === recipe.recipeNameId ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{
                      marginRight: "17px",
                      transform: "translate(4px, 6px)",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{
                      marginRight: "17px",
                      transform: "translate(4px, 6px)",
                    }}
                  />
                )}{" "}
                {recipe.recipeName}
              </div>
            </div>
            {selectedRecipe &&
              selectedRecipe.recipeNameId === recipe.recipeNameId && (
                <RecipePage
                  data={selectedRecipe}
                  isHomePage={isHomePage}
                  onClose={() => setSelectedRecipe(null)}
                />
              )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
