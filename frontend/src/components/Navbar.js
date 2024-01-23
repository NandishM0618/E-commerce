import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { logout } from "../redux/actions/userAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const [isUserMenuOpen, setIsUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.cartQuantity);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation();

  const logoutUser = () => {
    dispatch(logout());
    toast.success("Logout successful!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const toggleMenu = () => {
    setIsUserMenu(!isUserMenuOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const minScrollToShowBackground = 450;
    setHasBackground(scrollY > minScrollToShowBackground);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className="">
      <div
        className={`bg-none fixed top-0 left-0 z-40 w-full mx-auto px-2 sm:px-6 lg:px-8 ${
          hasBackground ? "bg-gray-800 text-white" : ""
        }`}
      >
        <div className="mx-auto flex items-center justify-between shadow-2xl">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0  gap-10 items-center">
              <h2 className="px-10 tracking-wider font-semibold text-lg">
                <NavLink
                  to="/"
                  className={`text-gray-800 ${
                    hasBackground ? "text-white" : "text-gray-800"
                  } `}
                >
                  Bliss Basket
                </NavLink>
              </h2>
            </div>
            <div className="flex md:hidden">
              <button
                onClick={toggleMobileMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <div className="hidden md:flex md:items-center">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  activeClassName="bg-gray-300 text-gray-800"
                  className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${
                    location.pathname === "/" ? "bg-gray-900 text-white" : ""
                  } ${hasBackground ? "text-white" : "text-gray-800"}`}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/about"
                  activeClassName="text-gray-800 hover:bg-gray-700 hover:text-white"
                  className={` hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium ${
                    hasBackground ? "text-white" : "text-gray-800"
                  }`}
                >
                  About
                </NavLink>

                <NavLink
                  to="/products"
                  activeClassName="bg-gray-300 text-gray-800"
                  className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${
                    location.pathname === "/products"
                      ? "bg-gray-900 text-white"
                      : ""
                  } ${hasBackground ? "text-white" : "text-gray-800"}`}
                >
                  Products
                </NavLink>

                <NavLink
                  to="/contact"
                  activeClassName="bg-gray-300 text-gray-800"
                  className={`text-gray-800 rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${
                    location.pathname === "/contact"
                      ? "bg-gray-900 text-white"
                      : ""
                  } ${hasBackground ? "text-white" : "text-gray-800"}`}
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <NavLink
              to="/search"
              activeClassName="hover:bg-gray-700 hover:text-white"
              className={` rounded-md px-3 py-2 text-sm font-medium ${
                location.pathname === "/search" ? "bg-gray-900 text-white" : ""
              } ${hasBackground ? "text-white" : "text-gray-800"} `}
            >
              <button
                type="button"
                className="relative rounded-full p-1 focus:outline-none focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Search</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
            </NavLink>

            <NavLink
              to="/cart"
              activeClassName="hover:bg-gray-700 hover:text-white"
              className={` rounded-md px-3 py-2 text-sm font-medium ${
                location.pathname === "/cart" ? "bg-gray-900 text-white" : ""
              } ${hasBackground ? "text-white" : "text-gray-800"}`}
            >
              <button
                type="button"
                className="relative rounded-md p-1 focus:outline-none focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
              </button>
              {cartQuantity.length > 0 && (
                <span className="absolute top-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartQuantity.length}
                </span>
              )}
            </NavLink>

            {isAuthenticated ? (
              <div className="relative ml-3 md:hidden">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="false"
                    onClick={toggleMenu}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.image?.url}
                      alt="User Profile"
                    />
                  </button>
                </div>

                <div
                  className={`${
                    isUserMenuOpen ? "block" : "hidden"
                  } absolute right-0 z-10 mt-2 w-48 origin-top-right md:hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={logoutUser}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                activeClassName=" hover:bg-gray-700 hover:text-white"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === "/login" ? "bg-gray-900 text-white" : ""
                } ${hasBackground ? "text-white" : "text-gray-800"}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </NavLink>
            )}
          </div>
        </div>
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden sm:hidden`}
          id="mobile-menu"
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="home"
              className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Home
            </a>

            <a
              href="about"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              About
            </a>

            <a
              href="products"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Products
            </a>

            <a
              href="contact"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Contact
            </a>
            {isAuthenticated ? (
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="false"
                    onClick={toggleMenu}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.image?.url}
                      alt="User Profile"
                    />
                  </button>
                </div>

                <div
                  className={`${
                    isUserMenuOpen ? "block" : "hidden"
                  } absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <Link
                    to="/user-profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </Link>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-2"
                    onClick={logoutUser}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <NavLink
                to="/login"
                activeClassName=" hover:bg-gray-700 hover:text-white"
                className={`rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === "/login" ? "bg-gray-900 text-white" : ""
                } ${hasBackground ? "text-white" : "text-gray-800"} `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 20a6 6 0 0 0-12 0" />
                  <circle cx="12" cy="10" r="4" />
                  <circle cx="12" cy="12" r="10" />
                </svg>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
