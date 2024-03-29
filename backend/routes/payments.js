const router = require("express").Router();

const {
  processPayment,
  checkAuth,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/payment-process", isAuthenticatedUser, processPayment);
router.get("/stripeapikey", isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
