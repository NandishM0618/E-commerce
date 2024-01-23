const User = require("../models/User");
const { sendTokens } = require("../jwt/sendTokens");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");

exports.registerUser = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  try {
    const hashPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashPass,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    sendTokens(user, 201, res);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (user && (await bcrypt.compare(password, user.password))) {
      sendTokens(user, 200, res);
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
};

// Logout user
exports.logOut = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
