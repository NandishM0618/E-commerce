import React from "react";
import { StarRating } from "../elements/StarRating";
import { Link } from "react-router-dom";

export const HeaderSlider = ({ product }) => {
  return (
    <div className="bg-none max-w-full text-white min-h-[580px] ">
      <div className="container mx-auto px-4 py-8">
        <div className="relative flex items-center my-10">
          <div className="w-full md:w-1/2 h-[450px]">
            <img
              src={product?.image[0]?.url}
              alt={product.name}
              className="rounded-lg  w-full object-cover h-[450px] shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 ml-8">
            <div className="text-xs text-blue-500 m-2 flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
              <p className="text-xs text-blue-500 font-bold rounded-full uppercase tracking-wide">
                trending this week
              </p>
            </div>
            <h2 className="text-3xl text-gray-800 font-bold mb-4">
              {product.name}
            </h2>
            <p className="text-lg text-gray-800 mb-4">{product.description}</p>
            <div className="border-t-2 flex flex-row gap-5 border-gray-600 pt-4">
              <div className="bg-white w-1/6 mt-2  rounded-md cursor-pointer">
                <Link
                  to={`/product/${product._id}`}
                  className="text-lg text-white bg-gray-800 p-2  font-semibold"
                >
                  Shop now
                </Link>
              </div>
              <div className="">
                <StarRating rating={parseFloat(product.ratings)} />
                <span className="text-gray-800 -mt-1">({product.ratings})</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
