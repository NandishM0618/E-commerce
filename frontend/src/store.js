import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer } from "./redux/reducers/userReducer";
import {
  productDetailsReducer,
  productReducer,
} from "./redux/reducers/productReducers";
import { cartReducer } from "./redux/reducers/cartReducer";
import {
  newOrderReducer,
  orderDetailsReducer,
} from "./redux/reducers/orderReducer";
import { myOrders } from "./redux/actions/orderAction";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  orderDetails: orderDetailsReducer,
  myOrders: myOrders,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
