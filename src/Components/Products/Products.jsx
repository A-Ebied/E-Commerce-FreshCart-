import axios from "axios";
import { useQuery } from "react-query";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import backGround from "../../Assets/images/light-patten.svg";
import { WhishListContext } from "../../Context/WhishListContext";
export default function Products() {
  let { addToCart } = useContext(CartContext);
  let { addToWhishList } = useContext(WhishListContext);

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

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const { isError, isFetching, isLoading, data } = useQuery(
    "allproducts",
    getAllProducts,
    {
      // cacheTime:2000
      // refetchInterval:1000
      // refetchOnMount:
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return (
    <div style={{ backgroundImage: `url(${backGround})` }}>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container py-5">
          <div className="row gx-0 mb-5">
            <MainSlider />
          </div>
          <CategorySlider />
          <div className="row g-4">
            {data?.data.data.map((product, index) => (
              <div
                className="  col-md-2 product cursor-pointer "
                key={product.id}
              >
                <Link to={`/datails/${product.id}`}>
                  <img src={product.imageCover} alt="" className="w-100" />
                  <h6 className="text-main my-2">{product.category.name}</h6>
                  <h2 className="h4 my-2">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="d-flex justify-content-between my-3">
                    <span>{product.price} Epg</span>
                    <span>
                      <i className="fa fa-solid fa-star rating-color fa-2"></i>{" "}
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
