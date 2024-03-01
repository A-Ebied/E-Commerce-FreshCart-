import React, { useContext } from "react";
import Style from "./ProductDetails.module.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WhishListContext } from "../../Context/WhishListContext";

export default function ProductDetails() {
  let params = useParams();
  function getProductDetails(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  let { isLoading, isError, data, isFetching } = useQuery(
    "ProductDetails",
    () => getProductDetails(params.id)
  );

  let { addToCart, setNumOfCartItem } = useContext(CartContext);
  let { addToWhishList } = useContext(WhishListContext);
  async function addWhishList(productId) {
    // console.log(productId);

    let { data } = await addToWhishList(productId);
    if (data.status != "success") {
      toast.success("Product Add WhishList", {
        duration: 4000,
        position: "bottom-right",
      });
    } else {
      toast.error("Product is Fail WhishList", {
        duration: 4000,
        position: "bottom-right",
      });
    }
    console.log(data);
  }

  async function addProduct(productId) {
    // console.log(productId);
    let res = await addToCart(productId);
    if (res.status == "success") {
      toast.success(res.message, {
        position: "bottom-right",
      });
    } else {
      toast.error("Failed");
    }
    setNumOfCartItem(data.numOfCartItems);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };
  return (
    <div className="container">
      {data?.data.data ? (
        <div className="row py-5 align-items-center">
          <Helmet>
            <meta name="description" content=""></meta>
            <title>{data?.data.data.title}</title>
          </Helmet>
          <div className="col-md-3">
            <Slider {...settings}>
              {data?.data.data.images.map((img, index) => {
                return <img key={index} className="w-100" src={img} />;
              })}
            </Slider>
          </div>
          <div className="col-md-8">
            <h2 className="h5 fw-bolder">{data?.data.data.title}</h2>
            <p className="text-muted">{data?.data.data.description}</p>
            <h6 className="text-main">{data?.data.data.category.name}</h6>
            <h6 className="text-main">Price: {data?.data.data.price} EGP</h6>
            <div className="d-flex justify-content-between my-3">
              <span>
                {" "}
                ratingsQuantity: {data?.data.data.ratingsQuantity} Epg
              </span>
              <span>
                <i className="fa fa-solid fa-star rating-color"></i>{" "}
                {data?.data.data.ratingsAverage}
              </span>
            </div>
            <button
              onClick={() => addProduct(data?.data.data.id)}
              className=" mt-5 btn text-white bg-main w-100"
            >
              ADD TO CART{" "}
            </button>
            <button
              onClick={() => addWhishList(data?.data.data.id)}
              className=" mt-5 btn text-white bg-danger w-100"
            >
              ADD TO WHISHLIST{" "}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
