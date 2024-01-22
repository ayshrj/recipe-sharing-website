import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipePage from "./RecipePage";
import RecipeList from "./RecipeList";
const Page1 = ({
  setIsHomePage,
  loggedInUserId,
  ownedRecipe,
  setOwnedRecipe,
}) => {
  setIsHomePage(false);
  const retrieveUserRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/recipes", {
        params: {
          loggedInUserId,
        },
      });

      console.log("LogginInUserIdIsSent", loggedInUserId);

      if (response.data.success) {
        setOwnedRecipe(response.data.myRecipe);
        console.log("recipes added", ownedRecipe);
      } else {
        alert("Error retrieving user recipes. " + response.data.message);
      }
    } catch (error) {
      console.error("Error retrieving user recipes:", error);
    }
  };

  return (
    <div>
      <RecipeList recipes={ownedRecipe} />
    </div>
  );
};

export default Page1;
