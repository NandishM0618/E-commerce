const Product = require("../models/Product");
const ApiFeatures = require("../utils/apiFeature");

// Admin
exports.createProduct = async (req, res) => {
  const newProd = await Product.create(req.body);
  res.status(201).json({ success: true, newProd });
};

// Get All Products
exports.getAllproducts = async (req, res) => {
  const resPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  res.status(200).json({ success: true, products, productsCount, resPerPage });
};

//Get Details of Product
exports.getProductDetails = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw "No such product exists";
  }
  res.status(200).json({
    success: true,
    product,
  });
};
