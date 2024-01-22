const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = parseInt(process.env.PORT);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {});

// MongoDB Global Information Schema
const globalInfoSchema = new mongoose.Schema({
  totalUser: Number,
  recipeID: Number,
});

const GlobalInfo = mongoose.model("GlobalInfo", globalInfoSchema);

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userid: Number,
});

const User = mongoose.model("User", userSchema);

// MongoDB RecipeIdSchema Schema
const recipeIdSchema = new mongoose.Schema({
  recipeid: Number,
  recipeName: String,
});

// MongoDB UserInfo Schema
const userInfoSchema = new mongoose.Schema({
  userid: Number,
  name: String,
  myRecipe: [recipeIdSchema],
  savedRecipe: [recipeIdSchema],
});

// MongoDB RecipeInfo
const recipeInfoById = new mongoose.Schema({
  recipeOwnerId: Number,
  recipeNameId: Number,
  recipeName: String,
  ingredients: mongoose.Schema.Types.Mixed,
  steps: [String],
});

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

const RecipeInfoByIdInfo = mongoose.model("RecipeInfoByIdInfo", recipeInfoById);

// Server startup logic
// app.listen(PORT + 1, async () => {
//   console.log(`Server is running on port ${PORT}`);

//   const globalInfo = await GlobalInfo.findOne();

//   if (!globalInfo) {
//     const newGlobalInfo = new GlobalInfo({
//       totalUser: 0,
//       recipeID: 0,
//     });

//     await newGlobalInfo.save();
//   }
// });

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.json({
        success: false,
        userFound: false,
        message: "Invalid credentials",
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      // Fetching user's info using the userid
      const userInfo = await UserInfo.findOne({ userid: user.userid });
      res.json({
        success: true,
        userFound: true,
        message: "Login successful",
        name: userInfo.name,
        userid: userInfo.userid,
      });
    } else {
      res.json({
        success: false,
        userFound: true,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Registration Route
// Registration Route
app.post("/register", async (req, res) => {
  const { username, password, name } = req.body;

  try {
    const globalInfo = await GlobalInfo.findOne();
    const newUser = new User({
      username,
      password: bcrypt.hashSync(password, 10),
      userid: globalInfo.totalUser,
    });

    await newUser.save();

    // Update the global totalUser
    globalInfo.totalUser++;
    await globalInfo.save();

    // Adding userIdInfo
    const newUserId = new UserInfo({
      userid: newUser.userid,
      name: name,
      myRecipe: [],
      savedRecipe: [],
    });

    console.log(newUser.userid);

    await newUserId.save();

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Retrieving user recipes route
app.get("/user/recipes", async (req, res) => {
  const { loggedInUserId } = req.query;
  console.log(loggedInUserId);
  try {
    const userInfo = await UserInfo.findOne({ userid: loggedInUserId });
    if (userInfo) {
      console.log("userFound");
      const myRecipe = userInfo.myRecipe;
      let recipeCompleteInfo = [];

      for (let i = 0; i < myRecipe.length; ++i) {
        try {
          console.log(myRecipe[i].recipeid);
          if (myRecipe[i].recipeid !== undefined) {
            const recipeInfo = await RecipeInfoByIdInfo.findOne({
              recipeNameId: myRecipe[i].recipeid,
            });

            recipeCompleteInfo.push(recipeInfo);
          }
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      }
      res.json({ success: true, myRecipe: recipeCompleteInfo });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Updating user recipes route
app.post("/user/addRecipe", async (req, res) => {
  const { loggedInUserId, recipeName, ingredientInputs, steps } = req.body;

  try {
    const globalInfo = await GlobalInfo.findOne();
    const userInfo = await UserInfo.findOne({ userid: loggedInUserId });

    if (userInfo) {
      // Adding the new recipe to the myRecipe array
      userInfo.myRecipe.push({
        recipeid: globalInfo.recipeID,
        recipeName: recipeName,
      });
      await userInfo.save();

      // Create a new document using the RecipeInfoByIdInfo model
      const newRecipe = new RecipeInfoByIdInfo({
        recipeOwnerId: loggedInUserId,
        recipeNameId: globalInfo.recipeID,
        recipeName: recipeName,
        ingredients: ingredientInputs,
        steps: steps,
      });

      // Save the new recipe document
      await newRecipe.save();

      // Update the global recipeID
      globalInfo.recipeID++;
      await globalInfo.save();

      res.json({ success: true, message: "Recipe added successfully" });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//Retrieving All Recipes in Complete Recipe Database
app.get("/recipes", async (req, res) => {
  try {
    const allRecipes = await RecipeInfoByIdInfo.find();
    res.json({ success: true, allRecipes: allRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the Express app
