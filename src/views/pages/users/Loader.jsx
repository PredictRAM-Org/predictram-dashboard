import { CSpinner } from "@coreui/react";
import React from "react";

function Loader() {
  return (
    <div className="d-flex justify-content-center my-4">
      <CSpinner />
    </div>
  );
}

export default Loader;
