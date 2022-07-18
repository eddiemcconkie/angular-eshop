require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const shopRoutes = require("./routes/shop");
const cartRoutes = require("./routes/cart");
const userRoutes = require("./routes/users");

const app = express();

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Could not connect to database");
  });

app.use(express.json());
app.use(cors());
app.use("/shop", shopRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
