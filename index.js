// jai shree ram
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const database = require("./config/database");

const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");

database.connect();

app.use(express.json());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/product", productRoutes);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});