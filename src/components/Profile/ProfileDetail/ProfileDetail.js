import React, { memo, useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/login/loginSlice";
import { useFormik } from "formik";
import { profileValidationSchema } from "../../../validations/profileValidationSchema";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import {
  getAllProvince,
  getDistrictInProvince,
  getFullAddressByWardIdApi,
  getPatientProfileApi,
  getWardInDistrict,
} from "../../../api/api";

const ProfileDetail = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { patientProfile } = {};
  const [userProfile, setUserProfile] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const [optionsProvince, setOptionsProvince] = useState(null);
  const [optionsDistrict, setOptionsDistrict] = useState(null);
  const [optionsWard, setOptionsWard] = useState(null);
  const [disabledDistrict, setDisabledDistrict] = useState(true);
  const [disabledWard, setDisabledWard] = useState(true);
  const [selectedWard, setSelectedWard] = useState(null);
  const [fullAddressByWardId, setFullAddressByWardId] = useState(null);
  const [provinceState, setProvinceState] = useState(null);
  const [districtState, setDistrictState] = useState(null);
  const [wardState, setWardState] = useState(null);

  const dispatch = useDispatch();
  const getPatientProfile = async () => {
    const res = await getPatientProfileApi(userInfo.user_role_id);
    setUserProfile(res?.[0]?.[0]);
    getFullAddressByWardId(res?.[0]?.[0]?.ward_id);
  };
  const getAllProvinceApi = async () => {
    const data = await getAllProvince();
    const cookedData = data.map(({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    setOptionsProvince(cookedData);
  };
  const getDistrictInProvinceApi = async (provinceId) => {
    const data = await getDistrictInProvince(provinceId);
    const cookedData = data[0].map(({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    console.log("district", cookedData);
    setOptionsDistrict(cookedData);
  };
  const getWardInDistrictApi = async (districtId) => {
    const data = await getWardInDistrict(districtId);
    const cookedData = data[0].map(({ id: value, title: label, ...rest }) => ({
      value,
      label,
      ...rest,
    }));
    setOptionsWard(cookedData);
  };

  const getFullAddressByWardId = async (wardId) => {
    const res = await getFullAddressByWardIdApi(wardId);
    setFullAddressByWardId(res?.[0]?.[0]);
    getDistrictInProvinceApi(res?.[0]?.[0]?.province_id);
    getWardInDistrictApi(res?.[0]?.[0]?.district_id);
  };
  const handleChangeProvince = async (value) => {
    console.log(value);
    await setDisabledDistrict(true);
    await getDistrictInProvinceApi(value);
    await setDisabledDistrict(false);
    setProvinceState(value);
    console.log(disabledDistrict);
  };
  const handleChangeDistrict = async (value) => {
    await setDisabledWard(true);
    await getWardInDistrictApi(value);
    await setDisabledWard(false);
    setDistrictState(value);
  };
  const handleChangeWard = async (value) => {
    setWardState(value);
  };
  useEffect(() => {
    getPatientProfile();
    getAllProvinceApi();
  }, []);

  console.log(userInfo?.id);

  const handleChangeProfile = () => {
    const { id, email, phone, username, role_id, user_role_id } =
      userProfileForm;
    const updatedUserProfile = {
      email,
      phone,
      username,
      role_id,
    };
    console.log(form.values);
    dispatch(
      updateUserProfileApi(id, updatedUserProfile, () => {
        dispatch(getPatientProfileApi(user_role_id));
      })
    );
    dispatch(
      updatePatientProfileApi(user_role_id, patientProfileForm, () => {
        dispatch(getPatientProfileApi(user_role_id));
      })
    );
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };
  const onFinish = (values) => {
    console.log({
      ...values,
      district: districtState ?? values.district,
      province: provinceState ?? values.province,
      ward: wardState ?? values.ward,
    });
  };
  return (
    <div>
      {userProfile && fullAddressByWardId && (
        <Form
          layout="vertical"
          style={{
            maxWidth: 600,
          }}
          size="large"
          onFinish={onFinish}
          initialValues={{
            username: userInfo?.username,
            fullname: userProfile?.fullname,
            role: userInfo?.role,
            email: userInfo?.email,
            dob: moment(userProfile?.date_of_birth, "YYYY-MM-DD"),
            phone: userInfo?.phone,
            fulladdress: userProfile?.fulladdress,
            gender: userProfile?.gender,
            province: fullAddressByWardId?.province_id,
            district: fullAddressByWardId?.district_id,
            ward: fullAddressByWardId?.ward_id,
          }}
        >
          <Row gutter={18}>
            <Col lg={12} md={12}>
              <Form.Item
                id="username"
                name="username"
                label={
                  <>
                    <span className="me-1">Username</span>
                    <span className="text-danger">*</span>
                  </>
                }
              >
                <Input
                  defaultValue={userInfo?.username}
                  name="username"
                  prefix={<UserOutlined />}
                  disabled
                  // onChange={handleChangeUserProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item label="Loại tài khoản" id="role" name="role">
                <Input
                  defaultValue={userInfo?.role}
                  name="role"
                  prefix={<UserOutlined />}
                  disabled
                  // onChange={handleChangeUserProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item
                label={
                  <>
                    <span className="me-1">Email</span>
                    <span className="text-danger">*</span>
                  </>
                }
                id="email"
                name="email"
              >
                <Input
                  defaultValue={userInfo?.email}
                  name="email"
                  prefix={<MailOutlined />}
                  disabled
                  // onChange={handleChangeUserProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item
                label="Họ và tên"
                id="fullname"
                name="fullname"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                <Input
                  name="fullname"
                  prefix={<UserOutlined />}
                  disabled={isDisabled}
                  defaultValue={userProfile?.fullname}
                  key={userProfile?.fullname + "fullname"}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item label="Số điện thoại" id="phone" name="phone">
                <Input
                  defaultValue={userInfo?.phone}
                  name="phone"
                  prefix={<PhoneOutlined />}
                  disabled={isDisabled}
                  key={userInfo?.phone + "phone"}
                  // onChange={handleChangeUserProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item label="Ngày tháng năm sinh" id="dob" name="dob">
                <DatePicker
                  className="w-100"
                  format="YYYY-MM-DD"
                  prefix={<CalendarOutlined />}
                  disabled={isDisabled}
                  name="date_of_birth"
                  disabledDate={disabledDate}
                  defaultValue={moment(
                    userProfile?.date_of_birth,
                    "YYYY-MM-DD"
                  )}
                  key={userProfile?.date_of_birth + "dob"}
                  // onChange={handleChangePatientProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item label="Giới tính" name="gender" id="gender">
                <Radio.Group
                  defaultValue={userProfile?.gender}
                  disabled={isDisabled}
                  key={userProfile?.gender + "gender"}
                  // onChange={handleChangePatientProfile}
                >
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              <Form.Item label="Địa chỉ" id="fulladdress" name="fulladdress">
                <Input
                  defaultValue={userProfile?.fulladdress}
                  name="fulladdress"
                  prefix={<HomeOutlined />}
                  disabled={isDisabled}
                  key={userProfile?.fulladdress + "fulladdress"}
                  // onChange={handleChangePatientProfile}
                />
              </Form.Item>
            </Col>
            <Col lg={24} xs={24}>
              {" "}
              <Form.Item
                id="province"
                label={
                  <>
                    <span className="me-1">Province</span>
                    <span className="text-danger">*</span>
                  </>
                }
                name="province"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                ]}
              >
                {" "}
                <Select
                  disabled={isDisabled}
                  defaultValue={fullAddressByWardId?.province_id}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select your province"
                  onChange={handleChangeProvince}
                  options={optionsProvince}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              {" "}
              <Form.Item
                id="district"
                label={
                  <>
                    <span className="me-1">District</span>
                    <span className="text-danger">*</span>
                  </>
                }
                name="district"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                  // {
                  //   validator: (_, value) => {
                  //     if (
                  //       optionsDistrict.some(
                  //         (obj) => obj?.value === districtState
                  //       )
                  //     ) {
                  //       return Promise.reject("Địa chỉ không hợp lệ");
                  //     }
                  //     return Promise.resolve();
                  //   },
                  // },
                ]}
              >
                {" "}
                <Select
                  defaultValue={fullAddressByWardId?.district_id}
                  name="district"
                  disabled={disabledDistrict}
                  options={optionsDistrict}
                  style={{
                    width: "95%",
                  }}
                  placeholder="Select your province"
                  onChange={handleChangeDistrict}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={12}>
              {" "}
              <Form.Item
                id="ward"
                label={
                  <>
                    <span className="me-1">Ward</span>
                    <span className="text-danger">*</span>
                  </>
                }
                name="ward"
                size="large"
                rules={[
                  {
                    required: true,
                    message: "Không được để trống",
                  },
                  // {
                  //   validator: (_, value) => {
                  //     if (optionsWard.some((obj) => obj?.value === value)) {
                  //       return Promise.resolve();
                  //     }
                  //     return Promise.reject("Địa chỉ không hợp lệ");
                  //   },
                  // },
                ]}
              >
                {" "}
                <Select
                  defaultValue={fullAddressByWardId?.ward_id}
                  disabled={disabledWard}
                  options={optionsWard}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select your ward"
                  onChange={handleChangeWard}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button
              type="default"
              size="large"
              className="me-3"
              onClick={() => setIsDisabled(false)}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              // onClick={handleChangeProfile}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default memo(ProfileDetail);
