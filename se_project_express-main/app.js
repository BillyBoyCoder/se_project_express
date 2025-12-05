require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001, MONGODB_URI } = process.env;

const app = express();

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
