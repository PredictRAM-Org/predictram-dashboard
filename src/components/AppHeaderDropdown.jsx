import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilCreditCard,
  cilLockLocked,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { get } from "axios";
const AppHeaderDropdown = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = async () => {
    try {
      await get("/api/auth/logout", {
        withCredentials: true,
      });

      localStorage.setItem(
        "investorpreAuth",
        JSON.stringify({ investorpreAuth: false })
      );

      localStorage.setItem(
        "investorAuth",
        JSON.stringify({ authenticated: false })
      );
      localStorage.removeItem("mobileNumber");
      dispatch({ type: "LOGOUT" });
      dispatch({ type: "INVESTOR_SIGNOUT" });
      history.replace("/login");
    } catch (err) {
      console.log("error", err.response);
    }
  };
  const userImage = useSelector((state) => state.user.image);
  const investorImage = useSelector((state) => state.investor.image);
  const active = useSelector((state) => state.user.check);
  const premiumUser = useSelector((state) => state.user.premiumUser);
  const investorAuth = useSelector((state) => state.investor.authenticated);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <div
          style={
            premiumUser
              ? { background: "#FFD700", padding: "5px", borderRadius: "50%" }
              : {}
          }
        >
          <CAvatar
            src={userImage || investorImage || "https://picsum.photos/200"}
            status={active ? "success" : "danger"}
            size="md"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        {!investorAuth && (
          <CDropdownItem href="/profile">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        )}
        {investorAuth && (
          <CDropdownItem href="/investor/profile">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>
        )}
        <CDropdownItem onClick={logout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
