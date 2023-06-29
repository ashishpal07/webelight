const express = require("express");
const route = express.Router();
const productController = require("../controller/product");
const Authentication = require("../middleware/auth");

// product can be created by admin only
route.post(
  "/create",
  Authentication.authenticate,
  Authentication.isAdmin,
  productController.createProduct
);

// product can be seen by user if he is loggein
route.get(
  "/:id",
  Authentication.authenticate,
  productController.getProductById
);

// product can be updated by admin only
route.put(
  "/update/:id",
  Authentication.authenticate,
  Authentication.isAdmin,
  productController.updateProduct
);

// product can be deleted by admin only
route.delete(
  "/delete/:id",
  Authentication.authenticate,
  Authentication.isAdmin,
  productController.deleteProduct
);

// all product list can be seen by logged in user
route.get(
  "/allProduct/:page/:limit",
  Authentication.authenticate,
  productController.getAllProducts
);

route.get(
  "/filter/byName",
  Authentication.authenticate,
  productController.filterProductByName
);

module.exports = route;
