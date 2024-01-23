import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { Login } from "./elements/Login";
import { Home } from "./components/Home";
import { Register } from "./elements/Register";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { ProductDetails } from "./components/ProductDetails";
import { ExploreProducts } from "./components/ExploreProducts";
import { UserProfile } from "./components/UserProfile";
import { Search } from "./components/Search";
import { Cart } from "./components/Cart";
import { NotFound } from "./elements/NotFound";
import Shipping from "./components/Shipping";
import { ConfirmOrder } from "./components/ConfirmOrder";
import { Payment } from "./components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import axios from "axios";
import { EmptyCart } from "./elements/EmptyCart";

function App() {
  const history = createBrowserHistory();
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/n0/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    getStripeApiKey();
  });
  return (
    <>
      <Router history={history}>
        <Navbar />

        {stripeApiKey ? (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <Routes>
              <Route path="/process-payment" element={<Payment />} />
            </Routes>
          </Elements>
        ) : (
          <Routes>
            <Route path="/process-payment" element={<NotFound />} />
          </Routes>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ExploreProducts />} />
          <Route path="/products/:keyword" element={<ExploreProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          {<Route path="/about" element={<NotFound />} />}
          {isAuthenticated ? (
            <Route path="/user-profile" element={<UserProfile />} />
          ) : (
            <Route path="/user-profile" element={<NotFound />} />
          )}
          {isAuthenticated ? (
            <Route path="/shipping" element={<Shipping />} />
          ) : (
            <Route path="/shipping" element={<NotFound />} />
          )}
          {cartItems ? (
            <Route path="/cart" element={<Cart />} />
          ) : (
            <Route path="/cart" element={<EmptyCart />} />
          )}
          {isAuthenticated ? (
            <Route path="/confirm-order" element={<ConfirmOrder />} />
          ) : (
            <Route path="/confirm-order" element={<NotFound />} />
          )}
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </>
  );
}

export default App;
