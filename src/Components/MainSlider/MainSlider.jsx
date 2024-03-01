import React from "react";
import Style from "./MainSlider.module.css";
import img1 from "../../Assets/images/Slider/slider-image-1.jpeg";
import img2 from "../../Assets/images/Slider/slider-image-2.jpeg";
import img3 from "../../Assets/images/Slider/slider-image-3.jpeg";
import img4 from "../../Assets/images/Slider/slider-2.jpeg";
import Slider from "react-slick";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return (
    <div className="row g-0">
      <div className="col-md-9">
        <Slider {...settings}>
          <img src={img1} height={400} alt="" className="w-100" />
          <img src={img2} height={400} alt="" className="w-100" />
          <img src={img3} height={400} alt="" className="w-100" />
          <img src={img4} height={400} alt="" className="w-100" />
        </Slider>
      </div>
      <div className="col-md-3">
        <img src={img2} height={200} alt="" className="w-100" />
        <img src={img1} height={200} alt="" className="w-100" />
      </div>
    </div>
  );
}
