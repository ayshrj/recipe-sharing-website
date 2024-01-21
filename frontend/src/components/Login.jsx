import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [newRecipeId, setNewRecipeId] = useState("");
  const [newRecipeName, setNewRecipeName] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");
  const [userRecipes, setUserRecipes] = useState([]);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.data.success) {
        alert("Login successful. Welcome, " + response.data.name);
        setName(response.data.name);
        setUserRecipes([]);
        setLoggedInUserId(response.data.userid);
        setIsUserLoggedIn(true);
      } else {
        alert("Login failed. Check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        password,
        name,
      });

      if (response.data.success) {
        alert("Registration successful");
      } else {
        alert("Registration failed. " + response.data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleRegisterClick = () => {
    setShowNameInput(!showNameInput);
  };

  const retrieveUserRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/recipes", {
        params: {
          userid: loggedInUserId,
        },
      });

      if (response.data.success) {
        setUserRecipes(response.data.myRecipe);
      } else {
        alert("Error retrieving user recipes. " + response.data.message);
      }
    } catch (error) {
      console.error("Error retrieving user recipes:", error);
    }
  };

  const addRecipe = async () => {
    try {
      if (!newRecipeId || !newRecipeName) {
        alert("Please enter both recipe id and name.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/user/add-recipe",
        {
          userid: loggedInUserId,
          recipeid: newRecipeId,
          recipeName: newRecipeName,
        }
      );

      if (response.data.success) {
        alert("Recipe added successfully");
        setNewRecipeId("");
        setNewRecipeName("");
      } else {
        alert("Error adding recipe. " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="off"
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
        />
      </label>
      <br />
      {showNameInput && (
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </label>
      )}
      <br />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>
      {showNameInput && (
        <button onClick={handleRegister}>Complete Registration</button>
      )}

      {isUserLoggedIn && (
        <div>
          <h2>Add Recipe</h2>
          <form>
            <label>
              Recipe ID:
              <input
                type="text"
                value={newRecipeId}
                onChange={(e) => setNewRecipeId(e.target.value)}
                autoComplete="off"
              />
            </label>
            <br />
            <label>
              Recipe Name:
              <input
                type="text"
                value={newRecipeName}
                onChange={(e) => setNewRecipeName(e.target.value)}
                autoComplete="off"
              />
            </label>
            <br />
            <button type="button" onClick={addRecipe}>
              Add Recipe
            </button>
            <button type="button" onClick={retrieveUserRecipes}>
              Retrieve My Recipes
            </button>

            <div>
              <h3>My Recipes</h3>
              <ul>
                {userRecipes.map((recipe) => (
                  <li key={recipe.recipeid}>
                    {recipe.recipeName} (ID: {recipe.recipeid})
                  </li>
                ))}
              </ul>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
