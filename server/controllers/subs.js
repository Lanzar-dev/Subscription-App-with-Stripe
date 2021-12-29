const stripe = require("../utils/stripe");

const prices = async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
};

module.exports = { prices };
