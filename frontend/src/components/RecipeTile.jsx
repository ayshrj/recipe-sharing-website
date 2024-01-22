import React from "react";
import "./RecipeTile.css";

const RecipeTile = ({
  recipeOwnerId,
  recipeName,
  recipeNameId,
  ingredients,
  inputWidth,
  setClickedRecipeId,
  retrieveRecipeData,
}) => {
  function toPascalCaseWithSpaces(str) {
    let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
  }

  // const slicedIngredients = Object.entries(ingredients).slice(0);
  const slicedIngredients = Object.entries(ingredients);

  return (
    <div
      className="recipe-tile"
      value={recipeNameId}
      style={{ width: `${inputWidth}px` }}
      onClick={(e) => {
        console.log("recipeNameId", recipeNameId);

        setClickedRecipeId(recipeNameId);
        retrieveRecipeData();
      }}
    >
      <h2>{recipeName}</h2>
      <p>By: {recipeOwnerId}</p>
      <h3>Ingredients:</h3>
      {/* {slicedIngredients.map(([ingredient, quantity], index) => (
        <span key={index}>
          {toPascalCaseWithSpaces(ingredient)}
          {index < slicedIngredients.length - 1 ? ", " : ""}
        </span>
      ))} */}
      {slicedIngredients.map(
        ([index, ingredient]) =>
          index < 5 && (
            <span key={index}>
              {toPascalCaseWithSpaces(ingredient.name)}
              {index < slicedIngredients.length - 1 ? ", " : ""}
            </span>
          )
      )}
    </div>
  );
};

// const slicedIngredients = Object.entries(ingredients);

export default RecipeTile;
