import React, { useState } from "react";
import DoctorItem from "../DoctorItem/DoctorItem";
import { Pagination } from "antd";

const DoctorList = (props) => {
  const { clinics, pharmacy, filterValue } = props;
  let listBusiness = [];
  const ITEMS_PER_PAGE = 4;
  const [state, setState] = useState({ minValue: 0, maxValue: 4 });

  if (filterValue === 1) {
    listBusiness = clinics;
  } else {
    listBusiness = pharmacy;
  }

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
      {listBusiness.slice(state.minValue, state.maxValue).map((item) => (
        <div className="col-12 col-md-12 col-lg-6">
          <DoctorItem item={item} key={item?.id} />
        </div>
      ))}
      <Pagination
        defaultCurrent={1}
        defaultPageSize={ITEMS_PER_PAGE} //default size of page
        onChange={handleChange}
        total={listBusiness.length}
      />
    </div>
  );
};

export default DoctorList;
