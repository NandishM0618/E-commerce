import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../redux/actions/userAction";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { error, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-md shadow-2xl w-full max-w-md">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form>
          <div className={`mb-4 ${emailFocused ? "mt-2" : ""}`}>
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
              value={email}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={`mb-6 ${passwordFocused ? "mt-2" : ""}`}>
            <label
              htmlFor="password"
              className={`block text-gray-600 transition-transform duration-300 ${
                passwordFocused || password ? "text-sm -translate-y-2" : ""
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
                value={password}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="mb-6 flex flex-row justify-between items-center">
            <p className="flex gap-1 hover:underline">
              <Link to="/sign-up" className="block text-gray-600">
                Sign up
              </Link>
            </p>
            <Link className={`block text-gray-600 hover:underline`}>
              Fogot Password ?
            </Link>
          </div>
          <button
            type="button"
            className="border-2 border-gray-800 font-semibold text-gray-800 py-2 px-4 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
