const express = require("express");
const route = express.Router();
const userController = require("../controller/userAuth");
const Authentication = require("../middleware/auth");

// user can signup
route.post("/signup", userController.signUp);

// user can log in
route.post("/login", userController.login);

// only admin can seen all the user / customer
route.get(
  "/getAllCustomer/:page/:limit",
  Authentication.authenticate,
  Authentication.isAdmin,
  userController.getAllCustomers
);

module.exports = route;
