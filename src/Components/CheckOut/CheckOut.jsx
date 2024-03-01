import React, { useContext } from "react";
import Style from "./CheckOut.module.css";
import { useFormik } from "formik";
import { CartContext } from "../../Context/CartContext";
export default function CheckOut() {
  let { payment } = useContext(CartContext);


  async function checkoutPayment(values) {
    const { data } = await payment(values);
    // console.log(data.session.url);
    window.location.href = data.session.url;
  }

  let formik = useFormik({
    initialValues: {
      detalis: "",
      city: "",
      phone: "",
    },
    onSubmit: checkoutPayment,
  });
  return (
    <div className="container bg-main-light p-4">
      <h2>CheckOut: </h2>
      <form onSubmit={formik.handleSubmit} className="w-75 m-auto">
        <label htmlFor="text">Detalis :</label>
        <input
          value={formik.values.detalis}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control w-80 mt-2 mb-2"
          type="text"
          id="detalis"
          name="detalis"
        />

        <label htmlFor="text">City :</label>
        <input
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control w-80 mt-2 mb-2"
          type="text"
          id="city"
          name="city"
        />

        <label htmlFor="phone">Phone :</label>
        <input
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="form-control w-80 mt-2 mb-2"
          type="tel"
          id="phone"
          name="phone"
        />

        <button
          type="submit"
          className="btn bg-main d-block ms-auto text-white mt-2"
        >
          Order
        </button>
      </form>
    </div>
  );
}
