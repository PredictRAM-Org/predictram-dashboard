import React, { lazy, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./assets/scss/style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "./redux/action/useraction";
import { ToastContainer } from "react-toastify";
import "quill/dist/quill.snow.css";
import "react-toastify/dist/ReactToastify.css";
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);
const DefaultLayout = lazy(() => import("./layouts/Defaultlayout"));
const AuthLayout = lazy(() => import("./layouts/Authlayout"));
const Page404 = lazy(() => import("./views/pages/Page404"));
const Page500 = React.lazy(() => import("./views/pages/Page500"));
function App() {
  const check = useSelector((state) => state.user.check);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuser());
  }, []);
  if (!check) return <h1>loading...</h1>;
  else
    return (
      <>
        <BrowserRouter basename="/webapp/test">
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
      </>
    );
}

export default App;
