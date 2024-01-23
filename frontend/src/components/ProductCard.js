import React from "react";
import { StarRating } from "../elements/StarRating";
import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className=" mx-auto bg-white rounded-md overflow-hidden shadow-md">
        <img
          className="w-full h-40 object-cover"
          src={product.image[0].url}
          alt={product.name}
        />
        <div className="p-4">
          <div className="flex gap-2 justify-start items-center">
            <StarRating rating={parseFloat(product.ratings)} />
            <span className="text-gray-600">({product.ratings})</span>
          </div>
          <h2 className="text-lg text-gray-800 font-semibold">
            {product.name}
          </h2>
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-row gap-2">
              <p className="text-sm font-bold text-red-500">${product.price}</p>
              <p className="text-sm font-bold text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
