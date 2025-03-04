import React from "react";
import { useSelector } from "react-redux";
import NoAccess from "../../utils/NoAccess";

function PremiumAccess({ children }) {
  const premiumUser = useSelector((state) => state.user.premiumUser);

  return (
    <>
      {!premiumUser && <NoAccess />}
      {premiumUser && <div>{children}</div>}
    </>
  );
}

export default PremiumAccess;
