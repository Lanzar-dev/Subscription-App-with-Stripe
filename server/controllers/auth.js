const { validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const stripe = require("../utils/stripe");

const signup = async (req, res) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => {
      return {
        msg: error.msg,
      };
    });
    return res.json({ errors, data: null });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.json({
      errors: [
        {
          msg: "Email already exist",
        },
      ],
      data: null,
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create the customer in stripe
  const customer = await stripe.customers.create(
    { email },
    { apiKey: process.env.STRIPE_SECRET_KEY }
  );

  const newUser = await User.create({
    email,
    password: hashedPassword,
    stripeCustomerId: customer.id,
  });

  const token = await JWT.sign(
    { email: newUser.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        stripeCustomerId: customer.id,
      },
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
      data: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "Invalid credentials",
        },
      ],
      data: null,
    });
  }

  const token = await JWT.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
};

const getUser = async (req, res) => {
  const user = await User.findOne({ email: req.user });

  return res.json({
    errors: [],
    data: {
      user: {
        id: user._id,
        email: user.email,
        stripeCustomerId: user.stripeCustomerId,
      },
    },
  });
};

module.exports = { signup, login, getUser };
