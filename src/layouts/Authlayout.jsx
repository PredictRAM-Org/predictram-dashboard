import React, { lazy, Suspense } from "react";
// import AuthNav from '../components/AuthNav'
import { AuthNav, Footer } from "../components/index";
import { Switch, Route, Redirect } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
const Loginform = lazy(() => import("../views/pages/users/auth/Loginform"));
export default function Authlayout() {
  return (
    <div className="wrapper d-flex flex-column min-vh-100 bg-light">
      <AuthNav />
      <div className="body flex-grow-1 px-3">
        <Suspense fallback={<CSpinner color="primary" />}>
          <Switch>
            <Route
              exact
              path="/auth/login"
              render={(props) => <Loginform {...props} />}
            />
            <Route
              exact
              path="/auth/register"
              render={(props) => <Loginform {...props} />}
            />
            <Redirect from="/" to="/404" />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}
