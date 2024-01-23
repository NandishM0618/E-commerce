const router = require("express").Router();
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/orderController");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.post("/new-order", isAuthenticatedUser, newOrder);
router.get("/order/:id", isAuthenticatedUser, getSingleOrder);
router.get("/new-orders", isAuthenticatedUser, myOrders);
module.exports = router;
