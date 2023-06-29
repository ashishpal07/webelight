const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // register / sign up the user
  signUp: async (req, res) => {
    try {
      const { firstName, lastName, email, password, accountType } = req.body;

      // valid all fields are present
      if (!firstName || !lastName || !email || !password || !accountType) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // check if user registered already
      const userPresent = await User.findOne({ email });

      if (userPresent) {
        return res.status(400).json({
          success: false,
          data: userPresent,
          message: "User already exist, try with different email",
        });
      }

      // not registered then encrypt password and create user
      const hashedPassword = await bcrypt.hash(password, 10);

      const createUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        accountType,
      });

      return res.status(201).json({
        success: true,
        message: "User signup successfully",
        data: createUser,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while signup user",
      });
    }
  },

  // login user
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await User.findOne({ email });

      // if user does not have an account
      if (!user) {
        return res.status(400).json({
          success: false,
          data: userPresent,
          message: "User not exist! please, signup first",
        });
      }

      // if user have an account then compare password and create token
      if (await bcrypt.compare(password, user.password)) {
        let payload = {
          email: user.email,
          id: user._id,
          accountType: user.accountType,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        user = user.toJSON();
        user.token = token;
        user.password = undefined;

        return res.status(200).json({
          success: true,
          message: "token created successfully",
          user,
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while login user",
      });
    }
  },

  // get all the customers pagination query
  getAllCustomers: async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 5;

      const totalCustomers = await User.count();
      
      const totlaPages = Math.ceil(totalCustomers / limit);

      const customers = await User.find(
        {},
        { firstName: true, lastName: true, email: true }
      )
        .skip((page - 1) * limit)
        .limit(limit);

      return res.status(200).json({
        success: true,
        totlaPages,
        customers,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Someting went wrong while getting all customers",
      });
    }
  },
};
