import React from "react";
import { CFooter, CLink } from "@coreui/react";

export default function Footer() {
  return (
    <CFooter>
      <div>
        <span>
          ©{new Date().getFullYear()} PredictRAM (Params Data provider Pvt.
          Ltd.). PredictRAM research are strictly for academic and professionals
          research purpose only. No Investment Advice. All Rights Reserved.
        </span>
      </div>
    </CFooter>
  );
}
