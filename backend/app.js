const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

// Import models
const Category = require("./models/category");
const Supplier = require("./models/supplier");
const Product = require("./models/product");
const Inventory = require("./models/inventory");

const app = express();
const port = 3000;

mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    console.log("MongoDB connected... Let's build something awesome! 🚀")
  )
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Welcome to Cosmetics Warehouse API - Your data is now alive! 💄✨");
});

app.listen(port, () => {
  console.log(
    `Server is up and running at http://localhost:${port} - Time to make your database beautiful!`
  );
});
