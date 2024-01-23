import React, { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/actions/productAction";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

export const ExploreProducts = () => {
  const dispatch = useDispatch();
  const { products, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  const [showCategories, setShowCategories] = useState(false);

  const categories = [
    "laptops",
    "electronics",
    "phones",
    "camera",
    "shoes",
    "clothes",
  ];
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);

  return (
    <div className="container mx-auto mt-10 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="col-span-1 mb-4 sm:mb-0">
          <div className="flex items-center justify-between bg-gray-800 p-4">
            <h2 className="text-lg font-bold text-white">Filter by Category</h2>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="text-blue-500 focus:outline-none"
            >
              {showCategories ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-filter-x"
                >
                  <path d="M13.013 3H2l8 9.46V19l4 2v-8.54l.9-1.055" />
                  <path d="m22 3-5 5" />
                  <path d="m17 3 5 5" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-filter"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              )}
            </button>
          </div>
          {showCategories && (
            <ul className="space-y-2 bg-gray-800 p-4 h-[500px]">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer   bg-gray-900 p-2 text-center text-white text-xl hover:scale-105  capitalize  ${
                    category === cat ? "text-blue-500 font-bold" : ""
                  }`}
                  onClick={() => {
                    setCategory(cat);
                    setShowCategories(false);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="grid grid-cols-2 col-span-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 justify-center">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
      {resPerPage < productsCount && (
        <div className="mt-4 flex justify-center">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productsCount}
            onChange={handlePageChange}
            nextPageText="Next"
            prevPageText="Prev"
            firstPageText="First"
            lastPageText="Last"
            itemClass="inline-block mr-2 px-4 py-2 cursor-pointer border border-gray-300 rounded"
            linkClass="text-blue-500"
            activeClass="bg-blue-500 text-white"
            activeLinkClass="text-white"
          />
        </div>
      )}
    </div>
  );
};
