import axios from "axios";
import {
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
} from "../constants/userConstant";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClEAR_CART } from "../constants/cartConstant";

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = { header: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(`/api/n0/register`, formData, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
    toast.success("Sign up Success");
  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response.data.message,
    });
    toast.error("Invalid Cerdentials");
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { header: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      `/api/n0/login`,
      { email, password },
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
    toast.success("Login successful");
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message,
    });
    toast.error("Invalid Credentials");
  }
};

// Logout User
export const logout = () => async (dispatch) => {
  try {
    await axios.get(`/api/n0/logout`);
    dispatch({ type: LOGOUT_SUCCESS });
    dispatch({ type: ClEAR_CART });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingInfo");
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
