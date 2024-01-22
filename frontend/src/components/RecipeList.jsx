// RecipeList.js
import React, { useState } from "react";
import RecipePage from "./RecipePage";
import "./RecipeList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const RecipeList = ({ recipes, isHomePage }) => {
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
      <h1 className="recipe-list-title">My Recipes</h1>
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <React.Fragment key={recipe.recipeNameId}>
            <div
              className="recipe-name"
              onClick={() => handleRecipeClick(recipe)}
              style={{ display: "flex" }}
            >
              <div>
                {selectedRecipe &&
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
