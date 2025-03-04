import { CButton } from "@coreui/react-pro";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import Loader from "../../Loader";
import {
  handelPaytmMoneyTokenExpire,
  paytmMoney_access_token_key,
} from "../../../../../utils/custom/paytmMoneyLogin";
import { PaytmMoneyProfile } from "../../../../../api/services/paytmMoneyService";
import { checkAccessToken } from "../../../../../utils/custom/fyersLogin";

function PortfolioOverview() {
  const [loading, setLoading] = useState(false);
  const [paytmMoneyProfile, setPaytmMoneyProfile] = useState({});
  const paytmMoney_access_token = localStorage.getItem(
    paytmMoney_access_token_key
  );

  const getpaytmMoneyProfile = async () => {
    const data = await PaytmMoneyProfile(setLoading, paytmMoney_access_token);
    if (!data?.profile) {
      handelPaytmMoneyTokenExpire();
    } else {
      setPaytmMoneyProfile(data?.profile?.data);
    }
  };

  useEffect(() => {
    getpaytmMoneyProfile();
  }, []);

  return (
    <div>
      {!loading && <div>HELLO {paytmMoneyProfile?.kycName}</div>}
      {loading && <Loader />}
    </div>
  );
}

export default PortfolioOverview;
