require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

// Replace with your actual connection string if not using environment variables
// I am not pushing my env file up to GitHub.
// For testing purposes, you can hardcode a connection string here
// Example: const testerConnectionString = "mongodb://localhost:27017/yourdbname";
const testerConnectionString = "Enter your connection string here:";

const { PORT = 3001, MONGODB_URI = testerConnectionString } = process.env;

const app = express();

// Middleware
app.use(express.json());

// Temporary middleware to simulate logged-in user
app.use((req, res, next) => {
  req.user = {
    _id: "6093136c5834af58c5b64606", // hardcoded user ID for now
  };
  next();
});

// Routes
app.use("/", routes);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
