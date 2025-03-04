import React, { lazy, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./assets/scss/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getuser, getVAR } from "./redux/action/useraction";
import { ToastContainer } from "react-toastify";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./utils/LoadingPage";
import loadScript from "./customHooks/loadScript";
import "./assets/css/Digitroll.css";
import { getInvestors } from "./api/services/InvestorService";

import "react-phone-number-input/style.css";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@mui/material";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const DefaultLayout = lazy(() => import("./layouts/Defaultlayout"));
const AuthLayout = lazy(() => import("./layouts/Authlayout"));
const Page404 = lazy(() => import("./views/pages/Page404"));
const Page500 = React.lazy(() => import("./views/pages/Page500"));

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: "#321fdb",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  const check = useSelector((state) => state.user.check);
  const investorAuth = JSON.parse(localStorage.getItem("investorAuth"));
  const userMobileNumber = localStorage.getItem("mobileNumber");
  const userEmail = localStorage.getItem("email");
  const [loading, setLoading] = useState(false);
  const queryClient = new QueryClient();

  const getAuthenticatedUserData = async () => {
    if (userMobileNumber) {
      const {
        data: [userData],
      } = await getInvestors(setLoading, { mobileNumber: userMobileNumber });
      if (!userData.secretToken) {
        userData.secretToken = userData.email;
      }
      localStorage.setItem("secretToken", userData.secretToken);
      // userData?.secretToken ? localStorage.setItem("secretToken", userData.secretToken) : localStorage.setItem("secretToken", userData.email);
      dispatch({ type: "INVESTOR_SIGNUP", payload: userData });
    }
    else if (userEmail) {
      const {
        data: [userData],
      } = await getInvestors(setLoading, { email: userEmail });
      if (!userData.secretToken) {
        userData.secretToken = userData.email;
      }
      localStorage.setItem("secretToken", userData.secretToken);
      dispatch({ type: "INVESTOR_SIGNUP", payload: userData });
    }
  };

  useEffect(() => {
    dispatch(getuser());
    if (!investorAuth?.authenticated) {
      dispatch(getVAR());
    }

    if (investorAuth?.authenticated) {
      dispatch({ type: "INVESTOR_AUTHENTICATED" });
      getAuthenticatedUserData();
    }
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  if (!check) return <LoadingPage />;
  else
    return (
      <>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <React.Suspense fallback={loading}>
                <Switch>
                  <Route
                    path="/auth"
                    render={(props) => <AuthLayout {...props} />}
                  />
                  <Route
                    exact
                    path="/500"
                    name="Page 500"
                    render={(props) => <Page500 {...props} />}
                  />
                  <Route
                    exact
                    path="/404"
                    name="Page 404"
                    render={(props) => <Page404 {...props} />}
                  />
                  <Route
                    path="/"
                    name="Home"
                    render={(props) => <DefaultLayout {...props} />}
                  />
                </Switch>
              </React.Suspense>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </ThemeProvider>
      </>
    );
}

export default App;
