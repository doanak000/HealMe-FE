import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import LayoutAdmin from "./containers/layout/Layout";
import { PublicRoutes, PrivateRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const App = () => {
  console.log("location", window.location.pathname);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <Router>
      {window.location.pathname.includes("admin") &&
      userInfo.role == "admin" ? (
        <Suspense
          fallback={
            <LayoutAdmin>
              <div>
                <Spinner size={20} />
              </div>
            </LayoutAdmin>
          }
        >
          <LayoutAdmin>
            <Switch>
              {PublicRoutes}
              {PrivateRoutes}
              <Redirect to={PATH.USER} />
            </Switch>
          </LayoutAdmin>
        </Suspense>
      ) : (
        <Suspense
          fallback={
            <div className="user-container">
              <Spinner size={20} />
            </div>
          }
        >
          <div className="user-container">
            <Switch>
              {PublicRoutes}
              {PrivateRoutes}
              <Redirect to={PATH.HOME} />
            </Switch>
          </div>
        </Suspense>
      )}
    </Router>
  );
};

export default App;
