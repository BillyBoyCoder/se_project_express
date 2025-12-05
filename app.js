require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const { PORT = 3001, DB_PASSWORD } = process.env;

const app = express();

mongoose.connect(`mongodb+srv://abetterlifewitharthur_db_user:${DB_PASSWORD}@test-cluster.gufraba.mongodb.net/wtwr_db?retryWrites=true&w=majority`);

app.use(express.json());

// Temporary user middleware for testing
app.use((req, res, next) => {
  req.user = { _id: "6751fa01bfb589b1abc081ad" };
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
