import { FaHome, FaLocationArrow } from "react-icons/fa";
import PinDrop from "@mui/icons-material/PinDrop";
import { FaPhone } from "react-icons/fa";
import Public from "@mui/icons-material/Public";
import TransferWithinAStation from "@mui/icons-material/TransferWithinAStation";
import { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";
import { Country, State } from "country-state-city";
import { Checkout } from "./Checkout";
import toast from "react-hot-toast";

export default function Shipping(params) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);
  const [state, setState] = useState(shippingInfo.state);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      toast.error("Phone Number should be alteast 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        phoneNo,
        state,
        pinCode,
      })
    );
    navigate("/confirm-order");
  };
  return (
    <div className="container mt-16 max-w-5xl mx-auto p-4">
      <h2 className="text-2xl text-gray-800 font-bold mb-4">
        Shipping Details
      </h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center">
          <FaHome className="mr-2" />
          <input
            type="text"
            placeholder="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <FaLocationArrow className="mr-2" />
          <input
            type="text"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <PinDrop className="mr-2" />
          <input
            type="number"
            placeholder="Pin Code"
            required
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <FaPhone className="mr-2" />
          <input
            type="number"
            placeholder="Phone Number"
            required
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none"
            size="10"
          />
        </div>

        <div className="flex items-center">
          <Public className="mr-2" />
          <select
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded p-2 focus:outline-none"
          >
            <option value="">Country</option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        {country && (
          <div className="flex items-center">
            <TransferWithinAStation className="mr-2" />
            <select
              required
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded p-2 focus:outline-none"
            >
              <option value="">State</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        )}

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={state ? false : true}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
