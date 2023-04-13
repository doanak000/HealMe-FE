import React, { useEffect, useState } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInfo } from "../../../features/login/loginSlice";
import { useFormik } from "formik";
import { profileValidationSchema } from "../../../validations/profileValidationSchema";
import {
  getPatientProfileApi,
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
  const userInfo = useSelector(selectUserInfo);
  const patientProfile = JSON.parse(localStorage.getItem("patientProfile"));
  const [isDisabled, setIsDisabled] = useState(true);

  const { id, username, phone, email, user_role_id } = userInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientProfileApi(user_role_id));
  }, [dispatch, user_role_id]);

  const form = useFormik({
    initialValues: {
      username: username,
      email: email,
      fullName: patientProfile?.fullname,
      phone: phone,
      dateOfBirth: new Date(),
      gender: patientProfile?.gender,
      address: patientProfile?.fulladdress,
    },
    validationSchema: profileValidationSchema,
  });

  const handleChangeProfile = () => {
    console.log(form.values);
    const { username, email, phone, address } = form.values;
    const { fullname, dob, gender } = form.values;
    const userUpdatedData = {
      username,
      email,
      phone,
      address,
    };
    const patientUpdatedData = {
      fullname,
      dob,
      gender,
    };
    dispatch(updateUserProfileApi(id, userUpdatedData));
    dispatch(updatePatientProfileApi(user_role_id, patientUpdatedData));
  };

  const disabledDate = (current) => {
    // Can not select days after today and today
    return current && current > dayjs().endOf("day");
  };

  return (
    <div>
      <Form
        layout="vertical"
        style={{
          maxWidth: 600,
        }}
        size="large"
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
                defaultValue={username}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="username"
                prefix={<UserOutlined />}
                disabled={isDisabled}
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
                defaultValue={email}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="email"
                prefix={<MailOutlined />}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Họ và tên">
              <Input
                defaultValue={patientProfile?.fullname}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="fullName"
                prefix={<UserOutlined />}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Số điện thoại">
              <Input
                defaultValue={phone}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="phone"
                prefix={<PhoneOutlined />}
                disabled={isDisabled}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker
                className="w-100"
                format="YYYY-MM-DD"
                prefix={<CalendarOutlined />}
                onBlur={form.handleBlur}
                disabled={isDisabled}
                name="dateOfBirth"
                onChange={(_, dateString) =>
                  form.setFieldValue("dateOfBirth", dateString)
                }
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Giới tính" name="radio-group">
              <Radio.Group
                defaultValue={patientProfile?.gender === "Male" ? "1" : "2"}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="gender"
                disabled={isDisabled}
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
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                name="address"
                prefix={<HomeOutlined />}
                disabled={isDisabled}
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
      </Form>
    </div>
  );
};

export default ProfileDetail;
