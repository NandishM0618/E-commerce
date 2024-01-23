import React from "react";

export const Banner = () => {
  return (
    <div className="bg-gray-800 text-white p-8">
      <div className="container  mx-auto flex gap-5 items-center justify-center">
        <div className="">
          <img
            src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Electronic Gadget"
            className="rounded-md shadow-md max-w-full h-auto"
          />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Discover the Latest Electronic Gadgets
          </h1>
          <p className="text-lg mb-6">
            Explore cutting-edge technology and find the perfect gadgets for
            you.
          </p>
        </div>
      </div>
    </div>
  );
};
