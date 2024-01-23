import React from "react";
import { Header } from "./Header";
import { Products } from "./Products";
import { Banner } from "./Banner";

export const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <Products />
    </>
  );
};
