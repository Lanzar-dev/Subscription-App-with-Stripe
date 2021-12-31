require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const subsRoutes = require("./routes/subs");
const articlesRoutes = require("./routes/articles");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/subs", subsRoutes);
app.use("/articles", articlesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port:${PORT}`);
});
