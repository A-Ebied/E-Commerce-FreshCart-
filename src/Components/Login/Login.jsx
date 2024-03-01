import React, { useContext, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import backGround from "../../Assets/images/light-patten.svg";
import { Helmet } from "react-helmet";

export default function Login() {
  let [error, setError] = useState(null);
  let [loader, setIsloader] = useState(false);
  let { setUserContaext } = useContext(UserContext);
  let navigate = useNavigate();

  async function submitLogin(values) {
    setIsloader(true);

    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setIsloader(false);
        setError(err.response.data.message);
      });
    // console.log(data);
    if (data.message == "success") {
      //login
      localStorage.setItem("userToken", data.token); // Token
      setUserContaext(data.token);
      setIsloader(false);
      navigate("/");
    }
  }

  let validateSchema = Yup.object({
    email: Yup.string()
      .email("email is invalied")
      .required("email is required"),
    password: Yup.string()
      .matches(/^[a-zA-Z0-9_-]{6,12}$/, "password is start UpperCase")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate,
    validationSchema: validateSchema,
    onSubmit: submitLogin,
  });

  return (
    <>
      <div
        className="w-75 py-5 mx-auto"
        style={{ backgroundImage: `url(${backGround})` }}
      >
        <Helmet>
          <title>Login Page</title>
        </Helmet>
        {error && <div className="alert alert-danger">{error}</div>}
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
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
              "Login"
            )}
          </button>
          <div className="d-flex align-items-center mt-2">
            <Link
              className="text-decoration-none text-success btn "
              to="/forgetpassword"
            >
              {" "}
              ForgetPassword ?{" "}
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
