import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion);
    setShowSuggestions(false);
  };

  const suggestions = [
    "Calvin Klein",
    "MacBook Air",
    "Samsung Galaxy S22",
    "Sony",
    "denim",
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setShowSuggestions(true);
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <div className="max-w-3xl mx-auto w-full  min-h-[340px] mt-20">
      <div className="container flex  w-full  scroll-m-0">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
        />

        <div className="absolute bg-gray-800 border min-h-[300px] border-gray-300 mt-12 p-2 rounded w-1/2 shadow-md">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="cursor-pointer text-white flex justify-between hover:bg-gray-100 hover:text-gray-800 p-1"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
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
                class="lucide lucide-arrow-up-right"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </div>
          ))}
        </div>

        <button
          onClick={handleSearch}
          className="ml-2 p-2  text-gray-800 rounded hover:scale-125"
        >
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
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
