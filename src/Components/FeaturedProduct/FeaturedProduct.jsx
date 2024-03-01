// import React, { useContext, useEffect, useState } from "react";
import Style from "./FeaturedProduct.module.css";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useQuery } from "react-query";
import ProductItem from "../../Components/ProductItem/ProductItem";

export default function FeaturedProduct() {
  // let [allProducts, setAllProducts] = useState([]);
  // let [loader, setIsloader] = useState(false);

  // async function getAllPruduct() {
  //   setIsloader(true);
  //   let { data } = await axios.get(
  //     `https://ecommerce.routemisr.com/api/v1/products`
  //   );
  //   // console.log(data);
  //   setAllProducts(data.data);
  //   setIsloader(false);
  // }
  // useEffect(() => {
  //   getAllPruduct();
  // }, []);
  function getFeaturedProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading, isError, isFetching, data } = useQuery(
    "FeaturedProduct",
    getFeaturedProduct,
    {
      // cacheTime:3000
      // refetchInterval:2000
      // refetchOnWindowFocus:false
      // refetchOnReconnect:false
      // refetchOnMount:false
    }
  );

  return (
    <div className={`row gy-4`}>
      {isLoading ? (
        <Loader />
      ) : (
        data?.data.data.map((product, index) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  );
}
