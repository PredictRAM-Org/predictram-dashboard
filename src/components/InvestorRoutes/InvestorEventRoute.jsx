import React from "react";
import { Redirect, Route } from "react-router-dom";
import InvestorViewEventDetails from "../../views/pages/investors/events/InvestorViewEventDetails";
import InvestorViewEvents from "../../views/pages/investors/events/InvestorViewEvents";

function InvestorEventRoute({ auth }) {
  return (
    <>
      <Route
        exact
        path="/investor/events"
        render={() =>
          auth ? <InvestorViewEvents /> : <Redirect to="/login" />
        }
      />
      <Route
        exact
        path="/investor/events/:id"
        render={() => <InvestorViewEventDetails />}
      />
    </>
  );
}

export default InvestorEventRoute;
