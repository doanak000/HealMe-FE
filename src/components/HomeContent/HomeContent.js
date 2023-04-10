import { Select, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import DoctorList from "../Doctor/DoctorList/DoctorList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProvinceApi } from "../../features/area/areaSlice";
import AreaSelect from "../AreaSelect/AreaSelect";

const HomeContent = () => {
  const { provinces } = useSelector((state) => state.area);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProvinceApi());
  }, []);

  const provincesOptions = provinces.map(
    ({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="my-3">
      <h5>Tìm kiếm bác sĩ/dược sĩ</h5>
      <div className="row">
        <div className="col-12 col-md-12 col-lg-12">
          <div className="my-1">
            <Select
              defaultValue="Bác Sĩ"
              style={{
                width: 100,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 1,
                  label: "Bác Sĩ",
                },
                {
                  value: 2,
                  label: "Dược Sĩ",
                },
              ]}
              size="large"
            />
          </div>
        </div>
      </div>
      <div className="row w-100 mt-2">
        <div className="col-lg-2 col-md-12 col-12 my-1">
          <Input
            placeholder="Tìm kiếm theo tên"
            style={{
              width: 200,
            }}
            size="large"
            className="w-100"
          />
        </div>
        <div className="col-lg-5 col-md-12 col-12 my-1">
          <AreaSelect />
        </div>
        <div className="col-lg-3 col-md-12 col-12 my-1">
          <Select
            placeholder="Chuyên Môn"
            onChange={handleChange}
            options={[
              {
                value: "Cơ - Xương - Khớp",
                label: "Cơ - Xương - Khớp",
              },
              {
                value: "Tai - Mũi - Họng",
                label: "Tai - Mũi - Họng",
              },
              {
                value: "Tim Mạch",
                label: "Tim Mạch",
              },
            ]}
            size="large"
            className="w-100"
          />
        </div>
        <div className="col-lg-2 col-md-12 col-12 my-1">
          <Button type="primary" size="large" className="w-100">
            Search
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="list-doctor my-3">
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
