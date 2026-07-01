const express = require("express");
const app = express();
require("./db/connection");
const userv = require("./Model/user.js");

const products = require("./Model/products");
const data = require("./Default/Default.js");
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.use("/api", require("./Routes/userRoutes.js"));

app.use("/image", express.static("image"));

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/getProducts", async (req, res) => {
  try {
    const data = await products.find({});
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(9000, () => {
  console.log("server run at:http://localhost:9000");
});
data();
