const express = require("express");
const { signup, login } = require("../controllers/auth");
const { body } = require("express-validator");
const router = express.Router();

router.post(
  "/signup",
  body("email").isEmail().withMessage("The email is invalid"),
  body("password").isLength({ min: 6 }).withMessage("The password is invalid"),
  signup
);

router.post("/login", login);

module.exports = router;
