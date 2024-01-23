import React from "react";
import { useSelector } from "react-redux";

export const UserProfile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="container  min-h-[370px] flex justify-center align-middle mx-auto mt-10 py-8">
      <div className="max-w-md mx-auto  bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl text-gray-800 font-bold mb-6">User Profile</h2>
        <div className="flex items-center mb-4">
          <img
            src={user.image.url}
            alt="User Profile"
            className="w-36 h-36 rounded-full mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
            <p className="text-gray-600 text-lg">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
