require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
