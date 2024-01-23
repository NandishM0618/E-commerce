import {
  ADD_TO_CART,
  ClEAR_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_QUANTITY,
} from "../constants/cartConstant";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shippingInfo: localStorage.getItem("shippingInfo")
    ? JSON.parse(localStorage.getItem("shippingInfo"))
    : {},
};

export const cartReducer = (
  state = { initialState, cartItems: [], shippingInfo: {}, cartQuantity: 0 },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
          cartQuantity: state.cartQuantity + item.quantity,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
          cartQuantity: state.cartQuantity + item.quantity,
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
        cartQuantity: state.cartQuantity - 1,
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartQuantity: action.payload,
      };
    case ClEAR_CART:
      return {
        cartItems: [],
        shippingInfo: {},
      };
    default:
      return state;
  }
};
