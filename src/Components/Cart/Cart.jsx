import React, { createContext, useEffect, useState } from "react";
import Style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { useContext } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import backGround from "../../Assets/images/light-patten.svg";

export default function Cart() {
  let {
    getLoggedUserCart,
    removeSpecificCartItem,
    updateProductQuantity,
    clearCarts,
    payment,
    setNumOfCartItem,
    numOfCartItems,
  } = useContext(CartContext);

  let [cartDetails, setCartDetails] = useState(null);
  let [isLoading, setisLoading] = useState(false);

  async function getCart() {
    let { data } = await getLoggedUserCart();
    setCartDetails(data);
    setisLoading(false);
  }

  async function removeItem(id) {
    let res = await removeSpecificCartItem(id);
    if (res.status === "success") {
      toast.success("Product Removed From Cart Successfully");
      getCart();
      setCartDetails(res);
      setNumOfCartItem(res.numOfCartItems);
    } else {
      toast.error("Something Went Wrong");
    }
  }
  async function updateCount(id, count) {
    let { data } = await updateProductQuantity(id, count);
    // setCartDetails(data);
    console.log(data);
    if (data.status == "success") {
      getCart();
      if (count == 0) {
        removeItem(id);
      } else {
        toast.success("Product Quantity Updated Successfully");
      }
    } else {
      toast.error("Something Went Wrong");
    }
  }

  async function clearCart() {
    const data = await clearCarts();
    if (data.message == "success") {
      toast.success("Product Removed From Cart Successfully", {
        theme: "dark",
      });
      setCartDetails(null);
      getCart();
      setNumOfCartItem(0);
    } else {
      toast.error("Something Went Wrong");
    }
  }

  useEffect(() => {
    setisLoading(true);
    getCart();
  }, []);
  return (
    <>
      <section
        className="py-5"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        {isLoading && <Loader />}
        <div className="container py-5 my-5 px-5">
          <h2 className="fw-semibold">Shopping Cart</h2>
          <Helmet>
            <title>Cart</title>
          </Helmet>
          {cartDetails ? (
            <section className="py-5">
              <div className="d-flex justify-content-between">
                <h3 className="fw-semibold">
                  Total Price :{" "}
                  <span className="text-main">
                    {cartDetails.data.totalCartPrice} EGP
                  </span>
                </h3>
                <h3 className="fw-semibold">
                  Total Items :{" "}
                  <span className="text-main"> {numOfCartItems} </span>
                </h3>
              </div>

              {cartDetails.data.products.map((product,index) => (
                <div key={index} className="row border border-2 py-3 my-3 align-items-center rounded-3">
                  <div className="col-md-2">
                    <figure>
                      <img
                        className="img-fluid"
                        src={product.product.imageCover}
                        alt={product.product.title}
                      />
                    </figure>
                  </div>
                  <div className="col-md-9 col-lg-8">
                    <h3 className="h5 fw-bold">{product.product.title}</h3>
                    <h4 className="h6 fs-6 text-muted fw-semibold">
                      {product.product.category.name}
                    </h4>
                    <h4 className=" text-main fs-5 fw-semibold mb-3">
                      {product.price} EGP
                    </h4>
                    <button
                      className="btn btn-danger text-white"
                      onClick={() => removeItem(product.product.id)}
                    >
                      {" "}
                      <i className="fa fa-trash"></i> Remove
                    </button>
                  </div>
                  <div className="col-md-1 col-lg-2 text-md-center mt-md-0 mt-3 ">
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          product.product.id,
                          product.count + 1
                        )
                      }
                      className="btn btn-outline-success"
                    >
                      +
                    </button>
                    <span className="mx-lg-3 mx-md-0 mx-3">
                      {product.count}
                    </span>
                    <button
                      onClick={() =>
                        updateProductQuantity(
                          product.product.id,
                          product.count - 1
                        )
                      }
                      disabled={product.count === 1 ? "disabled" : false}
                      className="btn btn-outline-danger"
                    >
                      -
                    </button>
                  </div>
                </div>
              ))}

              <Link
                to={`/checkout`}
                className="btn btn-success bg-main mb-3 w-100"
              >
                Checkout
              </Link>
              <button
                className="btn btn-outline-danger w-100 "
                onClick={clearCart}
              >
                Clear Cart
              </button>
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
