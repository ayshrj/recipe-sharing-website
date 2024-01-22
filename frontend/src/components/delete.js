const originalRecipe = {
  recipeOwnerId: "user202",
  recipeNameId: "palakPaneer303",
  recipeName: "Palak Paneer",
  ingredients: {
    Paneer: "250 gm, cubed",
    Spinach: "2 cups, blanched and pureed",
  },
  steps: [
    "Heat oil in a pan, add chopped onions and sauté until golden brown.",
    "Add ginger-garlic paste and sauté until the raw smell disappears.",
    "Add chopped tomatoes, cumin powder, coriander powder, turmeric powder, and red chili powder. Cook until tomatoes are soft.",
    "Add pureed spinach and cook for 5 minutes.",
    "Add paneer cubes, garam masala, salt, and fresh cream. Simmer for another 5 minutes.",
    "Garnish with coriander leaves and serve hot.",
  ],
};

// Convert ingredients to the desired format
const convertedIngredients = Object.entries(originalRecipe.ingredients).map(
  ([name, quantity]) => ({ name, quantity })
);

// Create the converted recipe object
const convertedRecipe = {
  recipeOwnerId: originalRecipe.recipeOwnerId,
  recipeNameId: originalRecipe.recipeNameId,
  recipeName: originalRecipe.recipeName,
  ingredients: convertedIngredients,
  steps: originalRecipe.steps,
};

console.log(convertedRecipe);
