import React from "react";
import LayoutUser from "../containers/layout/LayoutUser";
import PrescriptionNewForm from "../components/Prescription/PrescriptionNewForm/PrescriptionNewForm";

const PrescriptionNewPage = () => {
  return (
    <LayoutUser>
      <h2>Tạo toa thuốc mới</h2>
      <PrescriptionNewForm />
    </LayoutUser>
  );
};

export default PrescriptionNewPage;
