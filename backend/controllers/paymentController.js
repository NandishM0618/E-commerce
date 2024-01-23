const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
require("dotenv").config();

exports.checkAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    res.status(401).json({ error: "Unauthorized. Missing or Invalid Bearer" });
  }
  const token = authorization.slice(7);
  res.status(200).json({ success: true, token });
  next();
};

exports.processPayment = async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
};

exports.sendStripeApiKey = async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_APIKEY });
};
