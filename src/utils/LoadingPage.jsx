import { CSpinner } from "@coreui/react";
import React from "react";

function LoadingPage() {
  return (
    <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
      <div className="text-center">
        <CSpinner />
        <div className="fs-4 mt-2">Loading</div>
      </div>
    </div>
  );
}

export default LoadingPage;
