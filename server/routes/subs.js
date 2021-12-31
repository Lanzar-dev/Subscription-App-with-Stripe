const express = require("express");
const { prices, session } = require("../controllers/subs");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.get("/prices", checkAuth, prices);

router.post("/session", checkAuth, session);

module.exports = router;
