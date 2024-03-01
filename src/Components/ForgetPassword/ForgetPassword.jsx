import React from "react";
import Style from "./ForgetPassword.module.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from "react-helmet";
export default function ForgetPassword() {
  const validation = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("enter valid email"),
  });

  async function sendCode(values) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
      values
    );
    console.log(data);
    if (data.statusMsg === "success") {
      document.querySelector(".forgotpass").classList.add("d-none");
      document.querySelector(".verify").classList.remove("d-none");
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: sendCode,
  });

  const verify = Yup.object({
    resetCode: Yup.string().required("code is required"),
  });
  const navigate = useNavigate();

  async function restorecode(values) {
    const { data } = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
      values
    );
    console.log(data);
    if (data.status === "Success") {
      navigate("/resetpassword");
    }
  }
  const verifyformik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: verify,
    onSubmit: restorecode,
  });

  return (
    <>
      <div className="forgotpass">
        <Helmet>
          <title>Forget Password</title>
        </Helmet>
        <form onSubmit={formik.handleSubmit} className="w-75  my-5 mx-auto">
          <label>email:</label>
          <input
            onBlur={formik.handleBlur}
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            id="email"
            name="email"
            className="form-control"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="text-danger">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <button
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
            className="btn btn-outline-success my-3"
          >
            Send Code
          </button>
        </form>
      </div>
      <div className="verify d-none">
        <form
          onSubmit={verifyformik.handleSubmit}
          className="w-75  my-5 mx-auto"
        >
          <label>Reset:</label>
          <input
            onBlur={verifyformik.handleBlur}
            type="text"
            value={verifyformik.values.resetCode}
            onChange={verifyformik.handleChange}
            id="resetCode"
            name="resetCode"
            className="form-control"
          />
          {verifyformik.touched.resetCode && verifyformik.errors.resetCode ? (
            <p className="text-danger">{verifyformik.errors.resetCode}</p>
          ) : (
            ""
          )}
          <button
            type="submit"
            disabled={!(verifyformik.isValid && verifyformik.dirty)}
            className="btn btn-outline-success my-3"
          >
            Submit
          </button>
        </form>
      </div>{" "}
    </>
  );
}
