import React from "react";
import RecipeFormPage from "./RecipeFormPage";
const Page2 = ({ setIsHomePage, loggedInUserId }) => {
  setIsHomePage(false);
  return (
    <div>
      <RecipeFormPage loggedInUserId={loggedInUserId} />
    </div>
  );
};

export default Page2;
