import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Register = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/anime.png");
  const [avatarFocused, setAvatarFocused] = useState("");
  const [nameFocused, setNameFocused] = useState("");
  const [emailFocused, setEmailFocused] = useState("");
  const [passFocused, setPassFocused] = useState("");
  const [cnfPassFocused, setCnfPassFocused] = useState("");
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, password, email } = formData;
  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords Doesn't match");
      return;
    }
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    console.log("Registration Details:", { name, email, password });
  };

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  useEffect(() => {
    if (error) {
      console.log("error");
    }
    if (isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <div className="min-h-screen mt-10  flex items-center justify-center">
      <div className="bg-white  p-8 rounded-md  w-full max-w-md shadow-2xl">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form encType="multipart/form-data">
          <div className={`mb-4 ${nameFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="name"
              className={`block text-gray-600 transition-transform duration-300 ${
                nameFocused || name ? "text-sm -translate-y-2" : ""
              }`}
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder=""
              value={formData.name}
              onFocus={() => setNameFocused(true)}
              onBlur={() => setNameFocused(false)}
              onChange={handleChange}
            />
          </div>
          <div className={`mb-6 ${emailFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="email"
              className={`block text-gray-600 transition-transform duration-300 ${
                emailFocused || email ? "text-sm -translate-y-2" : ""
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder=""
              value={formData.email}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={handleChange}
            />
          </div>
          <div className={`mb-6 ${passFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="password"
              className={`block text-gray-600 transition-transform duration-300 ${
                passFocused || password ? "text-sm -translate-y-2" : ""
              }`}
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder=""
                value={formData.password}
                onFocus={() => setPassFocused(true)}
                onBlur={() => setPassFocused(false)}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className={`mb-6 ${cnfPassFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="confirmPassword"
              className={`block text-gray-600 transition-transform duration-300 ${
                cnfPassFocused || confirmPassword
                  ? "text-sm -translate-y-2"
                  : ""
              }`}
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showCnfPassword ? "text" : "password"}
                id="password"
                name="cnfPassword"
                className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                placeholder=""
                value={confirmPassword}
                onFocus={() => setCnfPassFocused(true)}
                onBlur={() => setCnfPassFocused(false)}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowCnfPassword(!showCnfPassword)}
              >
                {showCnfPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className={`mb-4 ${avatarFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="avatar"
              className={`block text-gray-600 transition-transform duration-300 ${
                avatarFocused || avatar ? "text-sm -translate-y-2" : ""
              }`}
            >
              Avatar
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="w-full p-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              onFocus={() => setAvatarFocused(true)}
              onBlur={() => setAvatarFocused(false)}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6 flex flex-row justify-between items-center">
            <p className="flex gap-1 text-gray-800">
              Have an account ?
              <Link to="/login" className="block text-gray-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
          <button
            type="button"
            className="border-2 border-gray-800 font-semibold text-gray-800 py-2 px-4 rounded-md hover:text-white hover:bg-gray-800 focus:outline-none"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
