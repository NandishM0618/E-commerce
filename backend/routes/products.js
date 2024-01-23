const router = require("express").Router();
const {
  createProduct,
  getAllproducts,
  getProductDetails,
} = require("../controllers/productControllers");
const { isAuthenticatedUser } = require("../middlewares/auth");

router.get("/products", getAllproducts);
router.get("/product/:id", getProductDetails);
router.post("/admin/product/new", createProduct);

module.exports = router;
