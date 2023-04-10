import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import PrescriptionDetail from "../components/Prescription/PrescriptionDetail/PrescriptionDetail";

const PrescriptionDetailPage = () => {
  return (
    <LayoutUser>
      <PrescriptionDetail />
    </LayoutUser>
  );
};

export default PrescriptionDetailPage;
