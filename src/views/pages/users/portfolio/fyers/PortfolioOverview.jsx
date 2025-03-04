import { CButton } from "@coreui/react-pro";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FyersProfile } from "../../../../../api/services/FyersService";
import {
  fyers_access_token_key,
  fyers_refresh_token_key,
  loginwithFyersRefreshToken,
} from "../../../../../utils/custom/fyersLogin";
import Loader from "../../Loader";

function PortfolioOverview() {
  const [loading, setLoading] = useState(false);
  const [fyersProfile, setFyersProfile] = useState({});
  const fyers_access_token = localStorage.getItem(fyers_access_token_key);
  const fyers_refresh_token = localStorage.getItem(fyers_refresh_token_key);

  const getFyersProfile = async () => {
    const data = await FyersProfile(setLoading, fyers_access_token);
    if (data?.expired) {
      loginwithFyersRefreshToken(fyers_refresh_token, setLoading);
    } else {
      setFyersProfile(data?.profile?.data);
    }
  };

  useEffect(() => {
    getFyersProfile();
  }, []);

  return (
    <div>
      {!loading && <div>HELLO {fyersProfile?.name}</div>}
      {loading && <Loader />}
    </div>
  );
}

export default PortfolioOverview;
