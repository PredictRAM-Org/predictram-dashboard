import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";

export default function ToastHolder() {
  return ReactDOM.createPortal(
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />,
    document.getElementById("portal")
  );
}
