// RecipePage.js
import React from "react";
import "./RecipePage.css";

const RecipePage = ({ data, isHomePage }) => {
  const { recipeName, ingredients, steps } = data;

  function toPascalCaseWithSpaces(str) {
    let result = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    result = result.charAt(0).toUpperCase() + result.slice(1);

    return result;
  }

  return (
    <div className="recipe-container">
      {isHomePage && <h1 className="recipe-name-opened">{recipeName}</h1>}

      <div className="ingredients-container">
        <h2>Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              {toPascalCaseWithSpaces(ingredient.name)} - {ingredient.quantity}
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
              {index < steps.length - 1 && <div className="steps-border"></div>}
            </React.Fragment>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipePage;
