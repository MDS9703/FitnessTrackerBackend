/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { generateToken } = require("./auth"); // Import the generateToken function
const { createUser, getUserByUsername } = require("../db/users");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body.user; // Extract username and password from req.body.user

    // Check if the username already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already taken.");
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await createUser({
      username,
      password: hashedPassword,
    });

    // Generate a JWT token
    const token = generateToken(user); // Use the generateToken function

    // Send the response
    res.json({
      message: "Thanks for signing up for our service.",
      token,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Get the user by username
    const user = await getUserByUsername(username);

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    // Verify the password
    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error("Invalid username or password.");
    }

    // Generate a JWT token
    const token = generateToken(user); // Use the generateToken function

    // Send the response
    res.json({
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
