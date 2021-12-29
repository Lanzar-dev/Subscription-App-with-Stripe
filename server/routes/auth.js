const express = require("express");
const { signup, login, getUser } = require("../controllers/auth");
const { body } = require("express-validator");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").isLength({ min: 6 }).withMessage("The password is invalid"),
  signup
);

router.post("/login", login);

router.get("/me", checkAuth, getUser);

module.exports = router;
