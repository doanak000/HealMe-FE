import { Image } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../assets/styles/component/DoctorItem/DoctorItem.css";
import { PATH } from "../../../constants/common";
import { getClinicInfoApi } from "../../../api/api";

const DoctorItem = (props) => {
  const { item } = props;
  const [clinicInfo, setClinicInfo] = useState(null);

  useEffect(async () => {
    const result = await getClinicInfoApi(item?.id);
    setClinicInfo(result[0][0]);
  }, []);

  return (
    <div className="row my-2 doctor-item-container p-2 mb-2 bg-body rounded bg-body rounded g-2">
      {/* <div className="col-3">
        <Image
          src="https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
          className="rounded"
        />
      </div> */}
      <div className="col-12 text-justify">
        <h4 className="text-justify doctor-name">
          <Link to={`/doctor/${item?.id}`} style={{ textDecoration: "none" }}>
            {item?.business_name}
          </Link>
        </h4>
        <p className="text-justify">
          <b>Email:</b> {clinicInfo?.email}
        </p>
        <p className="text-justify">
          <b>Phone:</b> {clinicInfo?.phone}
        </p>
        <p className="text-justify">
          <b>Địa chỉ:</b> {clinicInfo?.fulladdress}
        </p>
      </div>
    </div>
  );
};

export default DoctorItem;
