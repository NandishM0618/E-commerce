import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HeaderSlider } from "./HeaderSlider";
import { getProduct } from "../redux/actions/productAction";
import { BrowseCategory } from "./BrowseCategory";
import { useParams } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoSpeed: 3000,
  };
  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);
  return (
    <>
      <Slider {...sliderSettings} className=" max-w-7xl  mx-auto">
        {products
          .filter((product) => product.trending === true)
          .map((product) => (
            <HeaderSlider key={product._id} product={product} />
          ))}
      </Slider>
      <BrowseCategory />
    </>
  );
};
