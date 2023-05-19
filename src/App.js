import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import Spinner from "./components/spinner/Spinner";
import { PublicRoutes, PrivateRoutes } from "./configs/Router";
import { PATH } from "./constants/common";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import LayoutUser from "./containers/layout/LayoutUser";
import { getAddressDetail, getAllClinic, getAllPharmacy, getClinicInfoApi } from "./api/api";

const App = () => {
  const [listClinics, setListClinics] = useState([]);
  const [listPharmacy, setListPharmacy] = useState([]);
  useEffect(async () => {
    await getAllClinic().then((res) => setListClinics(res));
    await getAllPharmacy().then((res) => setListPharmacy(res));
  }, [])
  const tempClinicsArray = [], tempPharmacyArray = [];
  listClinics?.map(async (item) => {
    await getAddressDetail(item?.address_id)
      .then((res) => {
        tempClinicsArray.push(res?.[0]?.[0] || 'No Address')
      })
  })
  console.log('tempClinicsArray: ', tempClinicsArray)
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
