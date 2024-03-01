import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let WhishListContext = createContext();
export default function WhishListContextProvider(props) {
  const [numOfCartItems, setNumOfCartItem] = useState(0);
  const [whishListId, setWhishListId] = useState("");

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToWhishList(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        {
          headers: headers,
        }
      );
      // console.log(data);
      setNumOfCartItem(data.numOfCartItems);
      console.log(numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function getLoggedUserWhishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }
  async function removeProductFromWhishList(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers }
      );
      setNumOfCartItem(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <WhishListContext.Provider
      value={{
        addToWhishList,
        getLoggedUserWhishList,
        removeProductFromWhishList,
        setNumOfCartItem,
        numOfCartItems,
      }}
    >
      {props.children}
    </WhishListContext.Provider>
  );
}
