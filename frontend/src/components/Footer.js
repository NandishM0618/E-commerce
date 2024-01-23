import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div class="container mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div class="mb-4 lg:mb-0">
          <h2 class="text-2xl font-bold">Bliss Basket</h2>
          <p class="text-sm">Elevate your style with our exclusive products.</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="mb-4 lg:mb-0">
            <h3 class="text-lg font-bold mb-2">Categories</h3>
            <ul class="list-none p-0">
              <li>
                <Link
                  to="/products/denim"
                  class="text-gray-400 hover:text-white transition"
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <NavLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition"
                >
                  Women's Fashion
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  class="text-gray-400 hover:text-white transition"
                >
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products/nike"
                  class="text-gray-400 hover:text-white transition"
                >
                  Footwear
                </NavLink>
              </li>
            </ul>
          </div>

          <div class="mb-4 lg:mb-0">
            <h3 class="text-lg font-bold mb-2">Customer Service</h3>
            <ul class="list-none p-0">
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          <div class="mb-4 lg:mb-0">
            <h3 class="text-lg font-bold mb-2">About Us</h3>
            <ul class="list-none p-0">
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div class="mb-4 lg:mb-0">
            <h3 class="text-lg font-bold mb-2">Follow Us</h3>
            <ul class="list-none p-0">
              <li>
                <a
                  href="text"
                  class="text-gray-400  hover:text-white transition"
                >
                  <FaFacebook className="my-2" />
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400  hover:text-white transition"
                >
                  <FaInstagram className="my-2" />
                </a>
              </li>
              <li>
                <a
                  href="text"
                  class="text-gray-400 hover:text-white transition"
                >
                  <FaTwitter className="my-2" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
