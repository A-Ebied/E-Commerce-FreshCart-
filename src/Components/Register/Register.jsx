import React, { useState } from "react";
import Style from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Bars } from "react-loader-spinner";
import backGround from "../../Assets/images/light-patten.svg";
import { Helmet } from "react-helmet";

export default function Register() {
  let [error, setError] = useState(null);
  let [loader, setIsloader] = useState(false);
  let navigate = useNavigate();
  async function submitRegister(values) {
    setIsloader(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setIsloader(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.message == "success") {
      //login
      navigate("/login");
      setIsloader(false);
    }
  }
  // function validate(values) {
  //   let nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  //   let phoneRegex = /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/;
  //   let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  //   let passwordRegex = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "name is Required";
  //   } else if (!nameRegex.test(values.name)) {
  //     errors.name = "name is not Valied";
  //   }
  //   if (!values.email) {
  //     errors.email = "email is Required";
  //   } else if (!emailRegex.test(values.email)) {
  //     errors.email = "email is not Valied";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "phone is Required";
  //   } else if (!phoneRegex.test(values.phone)) {
  //     errors.phone = "phone is not Valied";
  //   }
  //   if (!values.password) {
  //     errors.password = "password is Required";
  //   } else if (!passwordRegex.test(values.password)) {
  //     errors.password = "password is not Valied";
  //   }

  //   return errors;
  // }

  let validateSchema = Yup.object({
    name: Yup.string()
      .min(3, "name minLength is 3")
      .max(10, "name maxLength is 10")
      .required("name is required"),
    email: Yup.string()
      .email("email is invalied")
      .required("email is required"),
    phone: Yup.string()
      .matches(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/, "phone is invalid ")
      .required("phone is required"),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9_-]{6,12}$/, "password is start UpperCase")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword not match")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    // validate,
    validationSchema: validateSchema,
    onSubmit: submitRegister,
  });

  return (
    <>
      <div
        className="w-75 py-5 mx-auto"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        <Helmet>
          <title>Register</title>
        </Helmet>
        {error && <div className="alert alert-danger">{error}</div>}
        <h2>Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">name: </label>
          <input
            id="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            type="text"
            className="form-control mb-2"
          />
          {formik.errors.name && formik.touched.name ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="email">Email: </label>
          <input
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            className="form-control mb-2"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone">Phone: </label>
          <input
            id="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="tel"
            className="form-control mb-2"
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            className="form-control mb-2"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="rePassword">rePassword: </label>
          <input
            id="rePassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            name="rePassword"
            type="password"
            className="form-control mb-2"
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div className="alert alert-danger p-2 mt-2">
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white mt-2"
          >
            {loader ? (
              <Bars
                height="30"
                width="50"
                color="#fff"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Register"
            )}
          </button>
          <div className="d-flex align-items-center mt-2">
            <Link
              className="text-decoration-none text-success btn "
              to="/login"
            >
              {" "}
              login Now ?{" "}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
