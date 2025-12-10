require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

// Replace with your actual connection string if not using environment variables
// I am not pushing my env file up to GitHub.
// For testing purposes, you can hardcode a connection string here
// Example: const testerConnectionString = "mongodb://localhost:27017/yourdbname";
const testerConnectionString = "Enter your connection string here:";

const { PORT = 3001, MONGODB_URI = testerConnectionString } = process.env;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
