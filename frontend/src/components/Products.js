import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ProductCard } from "./ProductCard";
import { getProduct } from "../redux/actions/productAction";
import { Link, useParams } from "react-router-dom";

export const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, resPerPage, productCount } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-xl text-left font-bold text-gray-800 p-2 py-4">
        Explore our Products
      </h2>
      <div className="grid grid-cols-4 gap-4 justify-center">
        {products.map((product) => {
          return <ProductCard product={product} key={product._id} />;
        })}
      </div>
      <div className="bg-gray-800 text-white w-36 p-2 my-4 mx-auto  hover:scale-105  text-center">
        <Link to="/products" className="">
          View Products
        </Link>
      </div>
    </div>
  );
};
