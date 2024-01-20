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
mongoose.connect(uri);

// MongoDB User Schema
var totalUser = 0;
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  userid: Number,
});

const User = mongoose.model("User", userSchema);

//// MongoDB recipeIdSchema Schema
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

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      // Fetch user info using the userid
      const userInfo = await UserInfo.findOne({ userid: user.userid });
      res.json({
        success: true,
        message: "Login successful",
        name: userInfo.name, // Include the name in the response
        userid: userInfo.userid,
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Registration Route
app.post("/register", async (req, res) => {
  const { username, password, name } = req.body;

  try {
    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ success: false, message: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      userid: totalUser,
    });

    await newUser.save();

    //Add userIdInfo
    const newUserId = new UserInfo({
      userid: totalUser,
      name: name,
    });

    await newUserId.save();

    totalUser++;

    res.json({ success: true, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Retrieve user recipes route
app.get("/user/recipes", async (req, res) => {
  const { userid } = req.query;

  try {
    const userInfo = await UserInfo.findOne({ userid });
    if (userInfo) {
      res.json({ success: true, myRecipe: userInfo.myRecipe });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update user recipes route
app.post("/user/add-recipe", async (req, res) => {
  const { userid, recipeid, recipeName } = req.body;

  try {
    console.log(userid, recipeid, recipeName);
    const userInfo = await UserInfo.findOne({ userid });
    if (userInfo) {
      // Check if the recipeid already exists in myRecipe array
      const existingRecipe = userInfo.myRecipe.find(
        (recipe) => recipe.recipeid == recipeid
      );

      if (existingRecipe) {
        res.json({ success: false, message: "Recipe already exists" });
      } else {
        // Add the new recipe to the myRecipe array
        userInfo.myRecipe.push({ recipeid, recipeName });
        await userInfo.save();
        res.json({ success: true, message: "Recipe added successfully" });
      }
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export the Express app
