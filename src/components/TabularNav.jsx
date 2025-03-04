import { CNav, CNavItem, CNavLink } from "@coreui/react";
import React from "react";

function TabularNav({ options = [], state, handleState }) {
  return (
    <CNav
      className="mx-auto my-4 justify-content-center"
      variant="pills"
      role="tablist"
    >
      {options?.map((el, index) => {
        return (
          <CNavItem key={index}>
            <CNavLink
              className="fw-bold"
              style={{ cursor: "pointer" }}
              active={state === index}
              onClick={() => handleState(index)}
            >
              {el}
            </CNavLink>
          </CNavItem>
        );
      })}
    </CNav>
  );
}

export default TabularNav;
