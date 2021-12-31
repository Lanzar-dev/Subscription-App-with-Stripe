const express = require("express");
const article = require("../controllers/articles");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");

router.get("/", checkAuth, article);

module.exports = router;
