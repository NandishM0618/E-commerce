import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../redux/actions/productAction";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StarRating } from "../elements/StarRating";
import { toast } from "react-toastify";
import { addItemsToCart } from "../redux/actions/cartAction";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { product, loading } = useSelector((state) => state.productDetails);

  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const addToCart = () => {
    if (!isAuthenticated) {
      toast.error("Please Login", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      dispatch(addItemsToCart(id, quantity));
      toast.success("item added to cart", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoSpeed: 2000,
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id, isAuthenticated]);
  return (
    <>
      {loading ? (
        <h2 className="text-gray-800 text-center  h-100vh text-xl">Loading</h2>
      ) : (
        <div className="container mx-auto mt-10 flex py-8">
          <div className="w-1/2 p-4">
            <Slider {...sliderSettings}>
              {product.image?.map((img, index) => (
                <div key={index}>
                  <img
                    src={img.url}
                    alt={`Product ${index + 1}`}
                    className="w-full  h-[500px] object-cover rounded"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-1/2 p-4">
            <div className="mb-4">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 flex flex-row  gap-2 mb-2">
                <StarRating rating={parseFloat(product.ratings)} />{" "}
                <span className="text-gray-600 -mt-1">({product.ratings})</span>
              </p>
              <p className="text-gray-600 mb-2">
                Product Reviews: {product.numOfReview}
              </p>
              <div className="mb-4">
                <p className="text-2xl text-blue-600 font-bold">
                  ${product.price}
                </p>
                <p className="text-sm font-bold text-gray-500 line-through">
                  ${product.originalPrice}
                </p>
              </div>
              <div className="flex gap-2 items-center mb-4">
                <label>Quantity</label>
                <button
                  className="bg-gray-800 ml-2 text-white px-2 py-2 rounded"
                  onClick={decreaseQuantity}
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
                    <path d="M5 12h14" />
                  </svg>
                </button>
                <input
                  type="number"
                  className="border-2 border-gray-300  p-2 w-14 text-center"
                  value={quantity}
                  readOnly
                />
                <button
                  className=" bg-gray-800 text-white px-2 py-2 rounded"
                  onClick={increaseQuantity}
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
                    class="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-800  text-white border-2  hover:text-gray font-semibold hover:bg-green-500 px-8 py-3 rounded-md">
                  Buy Now
                </button>
                <button
                  className="bg-none flex flex-row gap-2 text-gray-800 border-2 border-green-500 hover:text-white font-semibold hover:bg-green-500 px-8 py-3 rounded-md cursor-pointer"
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCart}
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
                    class="lucide lucide-shopping-cart"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Add to Cart
                </button>
              </div>
              <p className="text-gray-600 mt-4">
                Status:{" "}
                <b
                  className={
                    product.Stock < 1 ? " text-red-500" : "text-green-500"
                  }
                >
                  {product.Stock < 1 ? "OutOfStock" : "InStock"}
                </b>
              </p>
            </div>
            <div className="mb-4">
              <h3 className="text-xl text-gray-800 font-bold mb-2">
                Description
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div>
              <h3 className="text-xl text-gray-800 font-bold mb-2">
                Product Reviews
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {product.reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white flex flex-row gap-2 p-4 rounded border border-gray-200"
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
                      className="text-gray-800"
                    >
                      <path d="M18 20a6 6 0 0 0-12 0" />
                      <circle cx="12" cy="10" r="4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                    <div className="">
                      <p className="text-gray-600 font-semibold mb-2">
                        {review.name}
                      </p>
                      <p className="text-gray-500 mb-2">
                        Rating: {review.rating}
                      </p>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
