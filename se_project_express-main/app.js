require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001, MONGODB_URI } = process.env;

const app = express();

// Middleware
app.use(express.json());

// Temporary middleware to simulate logged-in user
app.use((req, res, next) => {
  req.user = {
    _id: "67520a4c05c2e4e5beaf6d32", // hardcoded user ID for now
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
