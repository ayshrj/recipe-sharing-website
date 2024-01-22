import React, { useEffect, useState } from "react";
import axios from "axios";
const Page1 = ({ setIsHomePage, loggedInUserId }) => {
  const [userRecipes, setUserRecipes] = useState([]);
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
        setUserRecipes(response.data.myRecipe);
        console.log("recipes added", userRecipes);
      } else {
        alert("Error retrieving user recipes. " + response.data.message);
      }
    } catch (error) {
      console.error("Error retrieving user recipes:", error);
    }
  };

  return (
    <div>
      <h1 onClick={retrieveUserRecipes}>Page 1</h1>
      <p>This is the content of Page 1.</p>
    </div>
  );
};

export default Page1;
