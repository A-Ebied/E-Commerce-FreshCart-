import React, { useContext } from "react";
import Style from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WhishListContext } from "../../Context/WhishListContext";

export default function ProductItem({ product }) {
  let { addToCart, setNumOfCartItem } = useContext(CartContext);
  let { addToWhishList } = useContext(WhishListContext);

  // async function addProduct(productId) {
  //   // console.log(productId);

  //   let { data } = await addToCart(productId);
  //   if (data.status === "success") {
  //     toast.success(data.message, {
  //       duration: 4000,
  //       position: "bottom-right",
  //     });
  //   } else {
  //     toast.error("Product is Fail", {
  //       duration: 4000,
  //       position: "bottom-right",
  //     });
  //   }
  //   console.log(data);
  //   setNumOfCartItem(data.data.numOfCartItems);
  // }
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
  }
  async function addWhishList(productId) {
    // console.log(productId);

    let { data } = await addToWhishList(productId);
    if (data.status != "success") {
      toast.success('Product Add WhishList', {
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
  return (
    <div className="  col-md-2 product cursor-pointer ">
      <Link to={`/datails/${product.id}`}>
        <img src={product.imageCover} alt="" className="w-100" />
        <h6 className="text-main my-2">{product.category.name}</h6>
        <h2 className="h4 my-2">
          {product.title.split(" ").slice(0, 2).join(" ")}
        </h2>
        <div className="d-flex justify-content-between my-3">
          <span>{product.price} Epg</span>
          <span>
            <i className="fa fa-solid fa-star rating-color"></i>{" "}
            {product.ratingsAverage}
          </span>
          {/* <span>
            <i className="fa-regular fa-heart fa-xl "></i>{" "}
          </span> */}
        </div>
      </Link>
      <button
        onClick={() => addProduct(product.id)}
        className=" w-100 btn bg-main text-center text-white mt-2"
      >
        ADD TO CART
      </button>
      <button
        onClick={() => addWhishList(product.id)}
        className=" w-100 btn bg-danger text-center text-white mt-2 rating-color"
      >
        <span>
          {/* <i className="fa-regular fa-heart fa-xl "></i>{" "} */}
          ADD TO WHISHLIST
        </span>{" "}
      </button>
    </div>
  );
}
