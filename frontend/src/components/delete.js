const recipes = [
  {
    recipeOwnerId: "user456",
    recipeNameId: "paneerMasala789",
    recipeName: "Paneer Butter Masala",
    ingredients: {
      Paneer: "250 gm, cubed",
      Onion: "2, finely chopped",
      Tomatoes: "3, pureed",
      GingerGarlicPaste: "1 tbsp",
      CashewNuts: "10, soaked",
      Cream: "1/4 cup",
      KasuriMethi: "1 tsp",
      GaramMasala: "1 tsp",
      TurmericPowder: "1/2 tsp",
      RedChiliPowder: "1 tsp",
      Butter: "2 tbsp",
      Salt: "to taste",
      CorianderLeaves: "for garnish",
    },
    steps: [
      "Sauté chopped onions in butter until golden brown.",
      "Add ginger-garlic paste and sauté until the raw smell disappears.",
      "Add pureed tomatoes, cashew nuts, turmeric powder, red chili powder, and salt. Cook until the oil separates.",
      "Add cream, garam masala, kasuri methi, and cubed paneer. Simmer for 5 minutes.",
      "Garnish with coriander leaves and serve hot.",
    ],
  },
  {
    recipeOwnerId: "user789",
    recipeNameId: "vegetableBiryani987",
    recipeName: "Vegetable Biryani",
    ingredients: {
      BasmatiRice: "1 cup, soaked",
      MixedVegetables: "1 cup (carrots, peas, beans)",
      Onion: "1, thinly sliced",
      Tomatoes: "2, chopped",
      GingerGarlicPaste: "1 tbsp",
      BiryaniMasala: "2 tsp",
      CuminSeeds: "1 tsp",
      CinnamonStick: "1 inch",
      Cloves: "3",
      Cardamom: "2 pods",
      BayLeaves: "2",
      CashewNuts: "10",
      Ghee: "2 tbsp",
      CorianderLeaves: "for garnish",
      Salt: "to taste",
      Water: "2 cups",
    },
    steps: [
      "Heat ghee in a pan and add cumin seeds, cinnamon stick, cloves, cardamom, and bay leaves.",
      "Add sliced onions and sauté until golden brown.",
      "Add ginger-garlic paste and chopped tomatoes. Cook until tomatoes are soft.",
      "Add mixed vegetables, biryani masala, and soaked rice. Sauté for 2 minutes.",
      "Transfer the mixture to a rice cooker, add water, and cook until rice is done.",
      "Garnish with fried cashew nuts and coriander leaves. Serve hot.",
    ],
  },
];

const convertedRecipes = SampleRecipes.map((originalRecipe) => {
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

  return convertedRecipe;
});

console.log(convertedRecipes);

// const recipe = [
//   {
//     recipeOwnerId: "user456",
//     recipeNameId: "paneerMasala789",
//     recipeName: "Paneer Butter Masala",
//     ingredients: {
//       {
//         name: "Paneer",
//         quantity: "250 gm, cubed",
//       },
//       {
//         name: "Onion",
//         quantity: "2, finely chopped",
//       },
//       {
//         name: "Tomatoes",
//         quantity: "3, pureed",
//       },
//     },
//     steps: [
//       "Sauté chopped onions in butter until golden brown.",
//       "Add ginger-garlic paste and sauté until the raw smell disappears.",
//       "Add pureed tomatoes, cashew nuts, turmeric powder, red chili powder, and salt. Cook until the oil separates.",
//       "Add cream, garam masala, kasuri methi, and cubed paneer. Simmer for 5 minutes.",
//       "Garnish with coriander leaves and serve hot.",
//     ],
//   },
//   {
//     recipeOwnerId: "user789",
//     recipeNameId: "vegetableBiryani987",
//     recipeName: "Vegetable Biryani",
//     ingredients: {
//       {
//         name: "BasmatiRice",
//         quantity: "1 cup, soaked",
//       },
//       {
//         name: "MixedVegetables",
//         quantity: "1 cup (carrots, peas, beans)",
//       },
//     },
//     steps: [
//       "Heat ghee in a pan and add cumin seeds, cinnamon stick, cloves, cardamom, and bay leaves.",
//       "Add sliced onions and sauté until golden brown.",
//       "Add ginger-garlic paste and chopped tomatoes. Cook until tomatoes are soft.",
//       "Add mixed vegetables, biryani masala, and soaked rice. Sauté for 2 minutes.",
//       "Transfer the mixture to a rice cooker, add water, and cook until rice is done.",
//       "Garnish with fried cashew nuts and coriander leaves. Serve hot.",
//     ],
//   },
// ];
