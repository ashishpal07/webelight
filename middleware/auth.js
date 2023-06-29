
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    authenticate: async (req, res, next) => {
        try {
            const token = req.header("Authorization").replace("Bearer ", "");

            // if token is missing
            if(!token) {
                return res.status(401).json({
                    success: false,
                    message: "Token not present"
                });
            }

            // verify token
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decode;
            } catch (err) {
                return res.status(401).json({
                    success: false,
                    message: "Token is invalid"
                });
            }

            next();
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while authenticating user",
            });
        }
    },

    isAdmin: async (req, res, next) => {
        try {
            const accountType = req.user.accountType;
            
            if(!accountType || accountType !== "Admin") {
                return res.status(401).json({
                    seccess: false,
                    message: "Not valid accountType for admin"
                });
            }

            next();
        } catch (err) {
            return res.status(500).json({
                seccess: false,
                message: "User role can not be verified, please try again"
            });
        }
    }
}