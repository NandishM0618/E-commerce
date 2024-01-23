import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export const ConfirmOrder = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;
  const tax = subtotal * 0.18;
  const totalPrice = subtotal + tax + shippingCharges;
  const address = `${shippingInfo.address}, ${shippingInfo.city},${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = { subtotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process-payment");
  };
  return (
    <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-md my-8">
      <div className="mb-4">
        <div className="mb-2">
          <p className="text-gray-600">Name:</p>
          <span className="text-black font-semibold">{user.name}</span>
        </div>
        <div className="mb-2">
          <p className="text-gray-600">Phone:</p>
          <span className="text-black font-semibold">
            {shippingInfo.phoneNo}
          </span>
        </div>
        <div>
          <p className="text-gray-600">Address:</p>
          <span className="text-black font-semibold">{address}</span>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Your Cart Items</h2>
        <div>
          {cartItems &&
            cartItems.map((item) => (
              <div key={item.product} className="mb-4 border-b pb-2">
                <img
                  src={item.image}
                  alt="product"
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p>
                    {item.quantity} X ${item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex justify-between mt-4 mb-6">
        <div>
          <div className="mb-2">
            <p className="text-gray-600">Subtotal:</p>
            <span className="text-black font-semibold">${subtotal}</span>
          </div>
          <div className="mb-2">
            <p className="text-gray-600">Shipping Charges:</p>
            <span className="text-black font-semibold">${shippingCharges}</span>
          </div>
          <div>
            <p className="text-gray-600">GST:</p>
            <span className="text-black font-semibold">${tax}</span>
          </div>
        </div>
        <div>
          <p className="text-lg font-semibold">
            <b>Total</b>
          </p>
          <span className="text-xl font-bold text-green-600">
            ${totalPrice}
          </span>
        </div>
      </div>

      <button
        onClick={proceedToPayment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Proceed To Payment
      </button>
    </div>
  );
};
