import React from "react";
import { useSelector } from "react-redux";
import NoAccess from "../../utils/NoAccess";

function UserAccess({ children }) {
  const role = useSelector((state) => state.user.role);
  const investorExists = useSelector((state) => state.investor.authenticated);

  return (
    <>
      {!(role === "USER") && !investorExists && <NoAccess />}
      {(role === "USER" || investorExists) && <div>{children}</div>}
    </>
  );
}

export default UserAccess;
