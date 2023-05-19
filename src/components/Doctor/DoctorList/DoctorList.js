import React, { useEffect, useState } from "react";
import DoctorItem from "../DoctorItem/DoctorItem";
import { Col, Input, Pagination, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const DoctorList = (props) => {
  const { clinics, pharmacy, filterValue } = props;
  const [searchText, setSearchText] = useState("");
  const [listBusiness, setListBusiness] = useState([]);
  const [listBusinessTemp, setListBusinessTemp] = useState([]);
  const ITEMS_PER_PAGE = 4;
  const [state, setState] = useState({ minValue: 0, maxValue: 4 });
  useEffect(async () => {
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

  return (
    <Row>
      <Col xs={24}>
        <Input placeholder="Nhập tên bác sĩ/dược sĩ/phòng khám để tìm" onChange={handleSearch} size="large" className="ms-2 mb-2 w-100" prefix={<SearchOutlined />} />
        <Row gutter={24}>
          {listBusinessTemp?.slice(state.minValue, state.maxValue).map((item) => (
            <Col xs={12} key={item?.id}>
              <DoctorItem item={item} key={item?.id} />
            </Col>
          ))}
        </Row>

      </Col>
      <Col xs={24}>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={ITEMS_PER_PAGE}
          onChange={handleChange}
          total={listBusiness.length}
          className="mx-auto d-block"
        />
      </Col>
    </Row>
  )
}

export default DoctorList
