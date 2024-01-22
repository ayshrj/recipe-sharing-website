// RecipeList.js
import React, { useState } from "react";
import RecipePage from "./RecipePage";
import "./RecipeList.css";

const RecipeList = ({ recipes }) => {
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
            >
              {recipe.recipeName}
            </div>
            {selectedRecipe &&
              selectedRecipe.recipeNameId === recipe.recipeNameId && (
                <RecipePage
                  data={selectedRecipe}
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
