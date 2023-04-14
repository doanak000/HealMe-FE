import React, { useEffect } from "react";
import PrescriptionItem from "../PrescriptionItem/PrescriptionItem";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/login/loginSlice";
import { getPrescriptionsOfPatientIdApi } from "../../../features/prescription/prescriptionSlice";

const PrescriptionList = () => {
  const userInfo = useSelector(selectUserInfo);
  const { prescriptions } = useSelector((state) => state.prescription);
  const { user_role_id } = userInfo;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPrescriptionsOfPatientIdApi(user_role_id));
  }, [dispatch, user_role_id]);
  console.log(prescriptions);
  return (
    <div className="row">
      <div className="col-12 col-md-12 col-lg-6">
        <PrescriptionItem />
      </div>
    </div>
  );
};

export default PrescriptionList;
