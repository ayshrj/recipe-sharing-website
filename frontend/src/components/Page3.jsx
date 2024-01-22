import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeList from "./RecipeList";

const Page1 = ({
  setIsHomePage,
  loggedInUserId,
  favourtieRecipe,
  setFavourtieRecipe,
  isHomePage,
}) => {
  setIsHomePage(false);
  useEffect(() => {
    const retrieveUserRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/recipes", {
          params: {
            loggedInUserId,
          },
        });

        console.log("LogginInUserIdIsSent", loggedInUserId);

        if (response.data.success) {
          setFavourtieRecipe(response.data.savedecipe);
          console.log("recipes added", favourtieRecipe);
        } else {
          alert("Error retrieving user recipes. " + response.data.message);
        }
      } catch (error) {
        console.error("Error retrieving user recipes:", error);
      }
    };

    retrieveUserRecipes();
  }, []);

  return (
    <div>
      <RecipeList
        recipes={favourtieRecipe}
        isHomePage={isHomePage}
        title={"Favourite Recipes"}
      />
    </div>
  );
};

export default Page1;
