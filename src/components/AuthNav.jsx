import React from "react";
import {
  CNavbar,
  CContainer,
  CNavItem,
  CNavLink,
  CHeaderNav,
  CHeaderBrand,
} from "@coreui/react";
import { NavLink } from "react-router-dom";
export default function AuthNav() {
  return (
    <>
      <CNavbar expand="lg" colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CHeaderBrand href="#">PredictRAM</CHeaderBrand>
          <CHeaderNav>
            <CNavItem>
              <CNavLink to="/auth/register" component={NavLink}>
                {" "}
                Register
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/auth/login" component={NavLink}>
                {" "}
                Login
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
      </CNavbar>
    </>
  );
}
