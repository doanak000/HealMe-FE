import React, { useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserInfo,
} from "../../../features/login/loginSlice";
import { useFormik } from "formik";
import { profileValidationSchema } from "../../../validations/profileValidationSchema";
import { getPatientProfileApi } from "../../../features/profile/profileSlice";

const ProfileDetail = () => {
  const userInfo = useSelector(selectUserInfo);
  const { patientProfile } = useSelector((state) => state.profile);

  const { username, phone, email, user_role_id } = userInfo;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientProfileApi(user_role_id));
  }, [dispatch, user_role_id]);

  const form = useFormik({
    initialValues: {
      email: "",
      username: "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
              <Input value={username} />
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
              <Input value={email} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Họ và tên">
              <Input value={patientProfile?.fullname} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Số điện thoại">
              <Input value={phone} />
            </Form.Item>
          </Col>
          {/* <Col lg={12} md={12}>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker
                onChange={() => console.log("something")}
                className="w-100"
                value={patientProfile?.date_of_birth}
              />
            </Form.Item>
          </Col> */}
          <Col lg={24} md={24}>
            <Form.Item label="Địa chỉ">
              <Input value={patientProfile?.fulladdress} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Giới tính" name="radio-group">
              <Radio.Group
                value={patientProfile?.gender === "Male" ? "1" : "2"}
              >
                <Radio value="1">Nam</Radio>
                <Radio value="2">Nư</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" size="large">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileDetail;
