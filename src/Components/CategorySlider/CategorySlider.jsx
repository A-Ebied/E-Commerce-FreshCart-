import React from "react";
import Style from "./CategorySlider.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
export default function CategorySlider() {
  function getMainSlider() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data } = useQuery("MainSlider", getMainSlider);
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true

  };
  return (
    <div className="my-5">
      <Slider {...settings}>
       {data?.data.data.map((category,index)=><div key={index} >
        <img height={300} src={category.image} alt={category.name} className="w-100"/>
        <h3>{category.name}</h3>
       </div>)}
      </Slider>
    </div>
  );
}
