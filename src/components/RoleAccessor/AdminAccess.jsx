import React from "react";
import { useSelector } from "react-redux";
import NoAccess from "../../utils/NoAccess";

function AdminAccess({ children }) {
  const admin = useSelector((state) => state.user.admin);

  return (
    <>
      {!admin && <NoAccess />}
      {admin && <div>{children}</div>}
    </>
  );
}

export default AdminAccess;
