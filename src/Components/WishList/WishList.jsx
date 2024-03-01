import React, { useEffect, useState } from "react";
import Style from "./WishList.module.css";
import { useContext } from "react";
import { WhishListContext } from "../../Context/WhishListContext";
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import backGround from "../../Assets/images/light-patten.svg";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WishList() {
  let {
    addToWhishList,
    getLoggedUserWhishList,
    removeProductFromWhishList,
    // setNumOfCartItem,
    // numOfCartItems,
  } = useContext(WhishListContext);
  let { setNumOfCartItem, numOfCartItems } = useContext(CartContext);
  let [whishListDetails, setWhishListDetails] = useState(null);

  let [isLoading, setisLoading] = useState(false);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
  };

  async function getWhishList() {
    let { data } = await getLoggedUserWhishList();
    setWhishListDetails(data);
    setisLoading(false);
  }

  async function removeItem(id) {
    let res = await removeProductFromWhishList(id);

    if (res.status === "success") {
      toast.success("Product Removed From WhishList Successfully");
      getWhishList();
      setWhishListDetails(res);
      setNumOfCartItem(res.numOfCartItems);
    } else {
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    setisLoading(true);
    getWhishList();
  }, []);
  return (
    <>
      <section
        className="py-5"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {isLoading && <Loader />}
        <div className="container py-5 my-5 px-5">
          <h2 className="fw-semibold">Shopping WhishList</h2>
          <Helmet>
            <title>WhishList</title>
          </Helmet>

          {whishListDetails ? (
            <section className="py-5">
              <div className="d-flex justify-content-between">
                {/* <h3 className="fw-semibold">
                  Total Price :{" "}
                  <span className="text-main">{whishListDetails.data.totalCartPrice} EGP</span>
          </h3> */}
                <h3 className="fw-semibold">
                  Total Items :{" "}
                  <span className="text-main"> {numOfCartItems} </span>
                </h3>
              </div>

              {whishListDetails?.data.map((data, index) => (
                <div
                  key={index}
                  className="row border border-2 py-3 my-3 align-items-center rounded-3"
                >
                  <div className="col-md-2">
                    <figure>
                      <img
                        className="img-fluid"
                        src={data.imageCover}
                        alt={data.title}
                      />
                    </figure>
                  </div>
                  <div className="col-md-9 col-lg-8">
                    <h3 className="h5 fw-bold">{data.title}</h3>
                    <h4 className="h6 fs-6 text-muted fw-semibold">
                      {/* {data.category.name} */}
                    </h4>
                    <h4 className=" text-main fs-5 fw-semibold mb-3">
                      {data.price} EGP
                    </h4>

                    <button
                      className="btn btn-danger text-white"
                      onClick={() => removeItem(data.id)}
                    >
                      {" "}
                      <i className="fa fa-trash"></i> Remove
                    </button>
                  </div>
                </div>
              ))}
            </section>
          ) : (
            <h3 className="my-5">
              There is no Products in your Cart Tap{" "}
              <Link className="text-decoration-none text-main" to={"/"}>
                here
              </Link>{" "}
              to continue shopping
            </h3>
          )}
        </div>
      </section>
    </>
  );
}
