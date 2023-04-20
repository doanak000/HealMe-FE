import React, { memo, useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/login/loginSlice";
import { useFormik } from "formik";
import {
  getPatientProfileApi,
  getUserProfileApi,
  updatePatientProfileApi,
  updateUserProfileApi,
} from "../../../features/profile/profileSlice";
import {
  CalendarOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const ProfileDetail = () => {
  // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const { patientProfile, userProfile } = null;
  // const [isDisabled, setIsDisabled] = useState(true);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserProfileApi(userInfo.id));
  //   dispatch(getPatientProfileApi(userInfo.user_role_id));
  // }, []);

  // console.log(userInfo?.id);

  // const form = useFormik({
  //   initialValues: {
  //     username: userProfile?.username,
  //     email: userProfile?.email,
  //     fullName: patientProfile?.fullname,
  //     phone: userProfile?.phone,
  //     dateOfBirth: new Date(),
  //     gender: patientProfile?.gender,
  //     address: patientProfile?.fulladdress,
  //   },
  //   validationSchema: profileValidationSchema,
  //   enableReinitialize: true,
  // });

  // const handleChangeUserProfile = (e) => {
  //   const value = e.target.value;
  //   setUserProfileForm({
  //     ...userProfileForm,
  //     [e.target.name]: value,
  //   });
  // };

  // const handleChangePatientProfile = (e) => {
  //   const value = e.target.value;
  //   setPatientProfileForm({
  //     ...patientProfileForm,
  //     [e.target.name]: value,
  //   });
  // };

  const handleChangeProfile = () => {
    // const { id, email, phone, username, role_id, user_role_id } =
    //   userProfileForm;
    // const updatedUserProfile = {
    //   email,
    //   phone,
    //   username,
    //   role_id,
    // };
    console.log(form.values);
    // dispatch(
    //   updateUserProfileApi(id, updatedUserProfile, () => {
    //     dispatch(getPatientProfileApi(user_role_id));
    //   })
    // );
    // dispatch(
    //   updatePatientProfileApi(user_role_id, patientProfileForm, () => {
    //     dispatch(getPatientProfileApi(user_role_id));
    //   })
    // );
  };

  const disabledDate = (current) => {
    return current && current > dayjs().endOf("day");
  };
  return (
    <div>
      {/* <Form
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        size="large"
        onFinish={onFinish}
        onSubmit={form.handleSubmit}
      >
        <Row gutter={18}>
          <Col lg={12} md={12}>
            <Form.Item
              label={
                <>
                  <span className="me-1">Username</span>
                  <span className="text-danger">*</span>
                </>
              }
            >
              <Input
                defaultValue={userProfile?.username}
                name="username"
                prefix={<UserOutlined />}
                disabled={isDisabled}
                // onChange={handleChangeUserProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
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
            >
              <Input
                defaultValue={userProfile?.email}
                name="email"
                prefix={<MailOutlined />}
                disabled={isDisabled}
                // onChange={handleChangeUserProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Họ và tên">
              <Input
                defaultValue={patientProfile?.fullname}
                name="fullname"
                prefix={<UserOutlined />}
                disabled={isDisabled}
                // onChange={handleChangePatientProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Số điện thoại">
              <Input
                defaultValue={userProfile?.phone}
                name="phone"
                prefix={<PhoneOutlined />}
                disabled={isDisabled}
                // onChange={handleChangeUserProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker
                className="w-100"
                format="YYYY-MM-DD"
                prefix={<CalendarOutlined />}
                disabled={isDisabled}
                name="date_of_birth"
                disabledDate={disabledDate}
                // onChange={handleChangePatientProfile}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Giới tính" name="radio-group">
              <Radio.Group
                defaultValue={patientProfile?.gender === "Male" ? "1" : "2"}
                name="gender"
                disabled={isDisabled}
                // onChange={handleChangePatientProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
              >
                <Radio value="1">Nam</Radio>
                <Radio value="2">Nư</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col lg={24} md={24}>
            <Form.Item label="Địa chỉ">
              <Input
                defaultValue={patientProfile?.fulladdress}
                name="fulladdress"
                prefix={<HomeOutlined />}
                disabled={isDisabled}
                // onChange={handleChangePatientProfile}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
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
            onClick={handleChangeProfile}
          >
            Lưu
          </Button>
        </Form.Item>
      </Form> */}
    </div>
  );
};

export default memo(ProfileDetail);
