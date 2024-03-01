import React, { useContext, useState } from "react";
import Style from "./Home.module.css";
import FeaturedProduct from "../../Components/FeaturedProduct/FeaturedProduct";
import MainSlider from "../../Components/MainSlider/MainSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import backGround from '../../Assets/images/light-patten.svg'


export default function Home() {
  return (
    <div className={`container mt-3`}>
      <Helmet>
        <meta name="description" content=""></meta>
        <title>Fresh Cart </title>
      </Helmet>
      <MainSlider />
      <CategorySlider />

      <FeaturedProduct />
    </div>
  );
}
