import React from "react";
import { useSelector } from "react-redux";

function SidebarUserAccess({ children }) {
  const role = useSelector((state) => state.user.role);

  return (
    <>
      {!(role === "USER") && <></>}
      {role === "USER" && <>{children}</>}
    </>
  );
}

export default SidebarUserAccess;
