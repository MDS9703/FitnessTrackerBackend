require("dotenv").config()
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./api/users");
const healthRouter = require("./api/health");

// Setup your Middleware and API Router here

// enable cors
app.use(cors());

// Parse JSON requests
app.use(express.json());

// API routes
app.use("/api/users", userRouter);
app.use("/api/health", healthRouter);

// health check endpoint
app.get('/health', (req, res) => {
    res.send('Server is up and running!');
});



module.exports = app;
