import React, { useState } from "react";
import DoctorItem from "../DoctorItem/DoctorItem";
import { Pagination } from "antd";

const DoctorList = (props) => {
  const { clinics } = props;
  const ITEMS_PER_PAGE = 4;
  const [state, setState] = useState({ minValue: 0, maxValue: 4 });

  const handleChange = (value) => {
    setState({
      ...state,
      minValue: (value - 1) * ITEMS_PER_PAGE,
      maxValue: value * ITEMS_PER_PAGE,
    });
  };

  return (
    <div className="row">
      {/* {clinics?.map((item) => (
        <div className="col-12 col-md-12 col-lg-6">
          <DoctorItem item={item} key={item?.id} />
        </div>
      ))} */}
      {clinics.slice(state.minValue, state.maxValue).map((item) => (
        <div className="col-12 col-md-12 col-lg-6">
          <DoctorItem item={item} key={item?.id} />
        </div>
      ))}
      <Pagination
        defaultCurrent={1}
        defaultPageSize={ITEMS_PER_PAGE} //default size of page
        onChange={handleChange}
        total={clinics.length}
      />
    </div>
  );
};

export default DoctorList;
