const express = require("express");
const userController = require("../Controller/userController");
const Router = express.Router();
Router.post("/signup", userController.signup);
Router.post("/login", userController.login);
Router.post("/addcart", userController.addcart);
Router.get("/getcart", userController.getcart);
Router.delete("/deletecart/:id", userController.deletecart);
module.exports = Router;
