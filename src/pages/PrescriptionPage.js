import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import PrescriptionList from "../components/Prescription/PrescriptionList/PrescriptionList";

const PrescriptionPage = () => {
  return (
    <LayoutUser>
      <h4>Tất cả toa thuốc</h4>
      <PrescriptionList />
    </LayoutUser>
  );
};

export default PrescriptionPage;
