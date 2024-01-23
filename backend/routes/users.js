const router = require("express").Router();
const {
  registerUser,
  logOut,
  loginUser,
} = require("../controllers/userControllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOut);
module.exports = router;
