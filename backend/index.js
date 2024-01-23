const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/users");
const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");
const paymentRoute = require("./routes/payments");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cookieParser());
dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connnected to MongoDB"))
  .catch((err) => console.error("Error Connecting to MongoDB:", err.message));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use("/api/n0", userRoute);
app.use("/api/n0", productRoute);
app.use("/api/n0", orderRoute);
app.use("/api/n0", paymentRoute);

app.listen(process.env.PORT, () =>
  console.log(`Listening on Port ${process.env.PORT}`)
);
