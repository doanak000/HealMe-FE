import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProvinceApi,
  getDistrictsInProvincesApi,
  getWardsInDistrictApi,
} from "../../features/area/areaSlice";
import { Col, Row, Select } from "antd";

const AreaSelect = () => {
  const { provinces, districts, wards } = useSelector((state) => state.area);
  const [provinceId, setProvinceId] = useState(0);
  const [districtId, setDistrictId] = useState(0);
  const [wardId, setWardId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProvinceApi());
    dispatch(getDistrictsInProvincesApi(provinceId));
    dispatch(getWardsInDistrictApi(districtId));
  }, [dispatch, provinceId, districtId, wardId]);

  const provincesOptions = provinces.map(
    ({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  const districtsOptions = districts.map(
    ({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  const wardsOptions = wards.map(({ id: value, title: label, ...rest }) => ({
    value,
    label,
    ...rest,
  }));

  return (
    <Row gutter={8}>
      <Col xs={8}>
        <Select
          onChange={(value) => setProvinceId(value)}
          options={provincesOptions}
          placeholder="Tỉnh/Thành phố"
          size="large"
          className="w-100"
        />
      </Col>
      <Col xs={8}>
        <Select
          onChange={(value) => setDistrictId(value)}
          options={districtsOptions}
          placeholder="Quận"
          size="large"
          className="w-100"
        />
      </Col>
      <Col xs={8}>
        <Select
          onChange={(value) => setWardId(value)}
          options={wardsOptions}
          placeholder="Huyện"
          size="large"
          className="w-100"
        />
      </Col>
    </Row>
  );
};

export default AreaSelect;
