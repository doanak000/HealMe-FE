import React, { memo, useEffect, useState } from "react";
import DoctorItem from "../DoctorItem/DoctorItem";
import { Input, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getMap } from "../../../api/api";

const DoctorList = (props) => {
  const { clinics, pharmacy, filterValue } = props;
  const [searchText, setSearchText] = useState("");
  const [listBusiness, setListBusiness] = useState([]);
  const [listBusinessTemp, setListBusinessTemp] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const [state, setState] = useState({ minValue: 0, maxValue: 4 });
  console.log(filterValue);
  useEffect(() => {
    if (filterValue === 1) {
      setListBusiness(clinics);
      setListBusinessTemp(clinics);
    } else {
      setListBusiness(pharmacy);
      setListBusinessTemp(pharmacy);
    }
  }, [clinics, pharmacy, filterValue]);
  const handleChange = (value) => {
    setState({
      ...state,
      minValue: (value - 1) * ITEMS_PER_PAGE,
      maxValue: value * ITEMS_PER_PAGE,
    });
  };
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchText(value);
    const listBusinessCookedData = listBusiness.filter((item) =>
      item?.business_name.toLowerCase().includes(value.toLowerCase())
    );
    setListBusinessTemp(listBusinessCookedData);
  };

  // if (localStorage.getItem('token')) {
  //   getMap({
  //     "destinations": [
  //       '99 Pham Viet Chanh, Ward 19, Binh Thanh District, Ho Chi Minh City'
  //     ]
  //   })
  //     .then(result => {
  //       if (!result) console.log('nothing')
  //     })
  //     .catch(err => console.log(err))
  // }

  console.log('Doctor List re-load')
  return (
    <div className="row">
      <Input placeholder="Nhập tên bác sĩ/dược sĩ/phòng khám để tìm" onChange={handleSearch} size="large" className="ms-2 mb-2 w-100" prefix={<SearchOutlined />} />
      {listBusinessTemp.slice(state.minValue, state.maxValue).map((item) => (
        <div className="col-12 col-md-12 col-lg-6" key={item?.id}>
          <DoctorItem item={item} key={item?.id} />
        </div>
      ))}
      <div className="col-12 col-md-12 col-lg-6">
        <Pagination
          defaultCurrent={1}
          defaultPageSize={ITEMS_PER_PAGE}
          onChange={handleChange}
          total={listBusiness.length}
          className="mx-auto d-block"
        />
      </div>
    </div>
  );
};

export default memo(DoctorList);
