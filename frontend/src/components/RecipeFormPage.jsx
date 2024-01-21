import React, { useState } from "react";
import "./RecipeFormPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import SampleRecipes from "./SampleRecipes";

function RecipeFormPage() {
  const [steps, setSteps] = useState([""]);
  const [recipeName, setRecipeName] = useState("");
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [currentIngredientQuantity, setCurrentIngredientQuantity] =
    useState("");
  const [ingredientInputs, setIngredientInputs] = useState([]);

  const handleAddStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, "");
    setSteps(newSteps);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    if (currentIngredient && currentIngredientQuantity) {
      const newIngredients = [
        ...ingredientInputs,
        { name: currentIngredient, quantity: currentIngredientQuantity },
      ];
      setCurrentIngredient("");
      setCurrentIngredientQuantity("");
      setIngredientInputs(newIngredients);
    }
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredientInputs];
    newIngredients.splice(index, 1);
    setIngredientInputs(newIngredients);
  };

  const handleRemoveStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const showDataSent = () => {
    console.log(SampleRecipes);
    const data = {
      recipeName: recipeName,
      ingredients: ingredientInputs,
      steps: steps.filter((value) => value !== ""),
    };
    console.log(data);
  };

  return (
    <div className="recipe-form-page">
      <h1>Create a New Recipe</h1>
      <form>
        <label htmlFor="recipeName">Recipe Name:</label>
        <input
          type="text"
          value={recipeName}
          className="recipeName"
          id="recipeName"
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Recipe Name"
          autoComplete="off"
        />

        <label htmlFor="ingredients">Ingredients:</label>
        <div className="ingredient-container">
          <input
            type="text"
            className="currentIngredient"
            value={currentIngredient}
            onChange={(e) => setCurrentIngredient(e.target.value)}
            placeholder="Ingredient"
            autoComplete="off"
          />
          <input
            type="text"
            className="currentIngredientQuantity"
            value={currentIngredientQuantity}
            onChange={(e) => setCurrentIngredientQuantity(e.target.value)}
            placeholder="Quantity"
            autoComplete="off"
          />
          <button
            className="add-ingredient-button"
            type="button"
            onClick={handleAddIngredient}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        <div className="ingredient-shown-container">
          {ingredientInputs.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              <span>{`${ingredient.name} - ${ingredient.quantity} `}</span>
              <FontAwesomeIcon
                icon={faClose}
                className="ingredient-cross-button"
                style={{
                  width: `7px`,
                  transform: "translate(0, 6%)",
                }}
                onClick={() => handleRemoveIngredient(index)}
              />{" "}
            </div>
          ))}
        </div>

        <label>Instructions:</label>
        {steps.map((step, index) => (
          <div key={index} className="step-container">
            <label style={{ width: 80 }}>{`Step ${index + 1}:`}</label>
            <input
              className="step-input"
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              autoComplete="off"
            />
            <button
              className="add-step-button"
              type="button"
              onClick={() => handleAddStep(index)}
            >
              <FontAwesomeIcon
                style={{ transform: `translate(0, 6%)` }}
                icon={faPlus}
              />
            </button>

            <button
              className="remove-step-button"
              type="button"
              onClick={() => handleRemoveStep(index)}
              disabled={`${steps.length > 1 ? "" : "true"}`}
            >
              <FontAwesomeIcon
                style={{ transform: `translate(0, 6%)` }}
                icon={faMinus}
              />
            </button>
          </div>
        ))}

        <p
          className="recipe-submit-button"
          type="submit"
          onClick={showDataSent}
        >
          Submit
        </p>
      </form>
    </div>
  );
}

export default RecipeFormPage;
