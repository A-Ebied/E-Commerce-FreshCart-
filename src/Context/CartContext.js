import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();
export default function CartContextProvider(props) {
  const [numOfCartItems, setNumOfCartItem] = useState(0);
  const [cartId, setCartId] = useState("");

  let headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
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

  async function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  async function removeSpecificCartItem(productId) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: headers }
      );
      setNumOfCartItem(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProductQuantity(productId, count) {
    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        { headers: headers }
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async function clearCarts() {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: headers }
      );
      setNumOfCartItem(data.numOfCartItems);
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  function payment(shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress: shippingAddress,
        },
        {
          headers: headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }

  async function getCount() {
    let { data } = await getLoggedUserCart();
    console.log(data);
    setNumOfCartItem(data.numOfCartItems);
    setCartId(data.data._id);
  }
  useEffect(() => {
    getCount();
  }, []);
  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedUserCart,
        removeSpecificCartItem,
        updateProductQuantity,
        numOfCartItems,
        setNumOfCartItem,
        clearCarts,
        payment,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
