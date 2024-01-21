import React from "react";
import RecipeFormPage from "./RecipeFormPage";
const Page2 = ({ setIsHomePage }) => {
  setIsHomePage(false);
  return (
    <div>
      <h1>Page 2</h1>
      <RecipeFormPage />
    </div>
  );
};

export default Page2;
