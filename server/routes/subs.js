const express = require("express");
const { prices } = require("../controllers/subs");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.get("/prices", checkAuth, prices);

module.exports = router;
