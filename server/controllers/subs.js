const stripe = require("../utils/stripe");
const User = require("../models/user");

const CLIENT_URL = "http://localhost:3000";

const prices = async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
};

const session = async (req, res) => {
  const user = await User.findOne({ email: req.user });
  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: `${CLIENT_URL}/articles`,
      cancel_url: `${CLIENT_URL}/article-plans`,
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json(session);
};

module.exports = { prices, session };
