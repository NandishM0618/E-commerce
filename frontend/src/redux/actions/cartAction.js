import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_QUANTITY,
} from "../constants/cartConstant";
import axios from "axios";

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/n0/product/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });
  dispatch(updateCartQuantity(getState().cart.cartQuantity));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  dispatch(updateCartQuantity(getState().cart.cartQuantity));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// UPDATE CART QUANTITY
export const updateCartQuantity = (quantity) => (dispatch, getState) => {
  const updatedCart = getState().cart.cartItems.map((item) => ({
    ...item,
    quantity: quantity,
  }));

  dispatch({
    type: UPDATE_CART_QUANTITY,
    payload: updatedCart,
  });
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
