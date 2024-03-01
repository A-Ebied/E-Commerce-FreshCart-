import React from "react";
import Style from "./Notfound.module.css";
import NotFound from "../../Assets/images/error.svg";
export default function Notfound() {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img src={NotFound} alt="" className="w-50" />
    </div>
  );
}
