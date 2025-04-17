const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middleware (optional)
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("MongoDB connected"));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  credentials: true,
}));

app.use("/user", userRoutes);
app.use("/achievement", achievementRoutes)
app.use("/recipe", recipeRoutes);

// Sample Route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

// Start Server
app.listen(PORT, () => {
 console.log(`Server is running on http://localhost:${PORT}`);
});