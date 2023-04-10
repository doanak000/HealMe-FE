import React, { useEffect } from "react";
import { Button, Col, DatePicker, Form, Input, Row, Radio } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUserInfo,
} from "../../../features/login/loginSlice";
import { Redirect } from "react-router-dom";
import { useFormik } from "formik";
import { profileValidationSchema } from "../../../validations/profileValidationSchema";
import { getPatientProfileApi } from "../../../features/profile/profileSlice";

const ProfileDetail = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);

  const { id, username, phone, email } = userInfo;

  if (!isLoggedIn) return Redirect("/");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPatientProfileApi(id));
  }, [dispatch, id]);

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
            <Form.Item label="Số điện thoại">
              <Input value={phone} />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Ngày tháng năm sinh">
              <DatePicker
                onChange={() => console.log("something")}
                className="w-100"
              />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Địa chỉ">
              <Input placeholder="Quận Bình Thạnh" />
            </Form.Item>
          </Col>
          <Col lg={12} md={12}>
            <Form.Item label="Giới tính" name="radio-group">
              <Radio.Group value={1}>
                <Radio value={1}>Nam</Radio>
                <Radio value={2}>Nư</Radio>
                <Radio value={3}>Khác</Radio>
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
