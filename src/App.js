import React, { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import { PublicRoutes, PrivateRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import LayoutUser from "./containers/layout/LayoutUser";

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="user-container">
            <Spinner size={20} />
          </div>
        }
      >
        <div className="user-container">
          <LayoutUser>
            <Switch>
              {PublicRoutes}
              {PrivateRoutes}
              <Redirect to={PATH.HOME} />
            </Switch>
          </LayoutUser>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
