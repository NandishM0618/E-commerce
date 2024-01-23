import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItemsFromCart } from "../redux/actions/cartAction";

export const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  return (
    <div className="container mx-auto min-h-[400px] mt-10">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

        {cartItems &&
          cartItems.map((item) => {
            return (
              <div
                className="flex items-center border-b border-gray-300 py-2"
                key={item.product}
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p
                    className=" bg-red-500 cursor-pointer w-20 p-1 text-center rounded-md text-white"
                    onClick={() => deleteCartItems(item.product)}
                  >
                    Remove
                  </p>
                </div>
                <div className="text-blue-500 font-semibold">
                  Total: ${item.price * item.quantity}
                </div>
              </div>
            );
          })}

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Cart Summary</h3>
          <div className="flex justify-between mt-2">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg text-gray-800 font-bold">{`$${cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            )}`}</span>
          </div>
        </div>

        <div className="mt-6">
          <Link to="/shipping">
            <button className="bg-gray-800 text-white px-8 py-3 rounded-md hover:bg-green-500 ">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
