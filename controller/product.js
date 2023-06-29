const Product = require("../models/product");

module.exports = {
  // create product
  createProduct: async (req, res) => {
    try {
      const { name, price, quantity } = req.body;

      if (!name || !price || !quantity) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const product = await Product.create({
        name,
        price,
        quantity,
      });

      return res.status(200).json({
        success: true,
        product,
      });
    } catch (err) {
      console.log(err);
      return res.staus(500).json({
        success: false,
        message: "Something went wrong while creating product",
      });
    }
  },

  // update product
  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const { name = "", quantity = 0, price = "" } = req.body;

      // if product does not exist
      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          success: true,
          message: "No product found by this id",
          updateProduct,
        });
      }

      const updateProduct = await Product.findByIdAndUpdate(
        id,
        {
          name: name === "" ? product.name : name,
          $inc: { quantity: quantity },
          price: price === "" ? product.price : price,
        },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        updateProduct,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating poduct",
      });
    }
  },

  // delete product
  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;

      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "No product found bu this id",
        });
      }

      await Product.findByIdAndDelete(id);

      return res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while deleting poduct",
      });
    }
  },

  getProductById: async (req, res) => {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(401).json({
          success: true,
          message: "Please provide the id in params",
        });
      }
      const product = await Product.findById(id);

      if (!product) {
        return res.status(400).json({
          success: false,
          message: "No product found by this id",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        product,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while getting product by id poduct",
      });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 5;

      const totalProducts = await Product.count();
      const totalPages = Math.ceil(totalProducts / limit);

      const products = await Product.find({})
        .skip((page - 1) * limit)
        .limit(limit);

      return res.status(200).json({
        success: true,
        products,
        totalPages,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while getting all product",
      });
    }
  },

  filterProductByName: async (req, res) => {
    try {
      const { name} = req.body;
      
      // adding filter query
      const nameFilter = name ? { name: { $regex: name, $options: "i" } } : {};

      const products = await Product.find(nameFilter);

      return res.status(200).json({
        sucess: true,
        message: `Products name startswith ${name}!`,
        products,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while filter product by name",
      });
    }
  },
};
