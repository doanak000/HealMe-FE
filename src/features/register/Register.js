import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { registerFail, registerSuccess } from './registerSlice'
// import {  useLocation } from 'react-router-dom'
import { Notification } from "../../components/Notification/Notification";
// import { NOTIFICATION_TYPE } from '../../constants/common'
// import { selectTranslation } from '../language/languageSlice'
import { Form, Input, Checkbox, DatePicker, Select } from "antd";
import {
  RegisterButton,
  RegisterLable,
  TitleRegister,
  WrapperRegister,
  WrapperRegisterForm,
} from "./Register.style";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { registerSuccess } from "./registerSlice";
import { NOTIFICATION_TYPE, PATH } from "../../constants/common";
import { translation } from "../../configs/translation";
import {
  createPatientProfile,
  getAllProvince,
  getDistrictInProvince,
  getWardInDistrict,
  register,
} from "../../api/api.js";
import { useEffect } from "react";
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
};
const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [stopRegister, setStopRegister] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const [optionsProvince, setOptionsProvince] = useState(null);
  const [optionsDistrict, setOptionsDistrict] = useState(null);
  const [optionsWard, setOptionsWard] = useState(null);
  const [disabledDistrict, setDisabledDistrict] = useState(true);
  const [disabledWard, setDisabledWard] = useState(true);
  const [selectedWard, setSelectedWard] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
  });
  const { from } = { from: { pathname: "/" } };
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
  const handleChangeProvince = async (value) => {
    console.log(value);
    await setDisabledDistrict(true);
    await getDistrictInProvinceApi(value);
    await setDisabledDistrict(false);
    console.log(disabledDistrict);
  };
  const handleChangeDistrict = async (value) => {
    await setDisabledWard(true);
    await getWardInDistrictApi(value);
    await setDisabledWard(false);
  };
  const handleChangeWard = async (value) => {
    setSelectedWard(value);
  };

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value,
    });
  };

  const disabledDate = (current) => {
    // Get the current date and subtract 10 years
    const tenYearsAgo = new Date();
    tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

    // Disable dates that are after the current date or before ten years ago
    return current && (current > new Date() || current < tenYearsAgo);
  };
  const RegisterHandler = async () => {
    setStopRegister(true);
    setLoadingState(true);
    if (user.password !== user.password2) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Register fail",
        description: "Password refill is different password",
      });
      return;
    }
    try {
      const userData = await register(user);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Register success",
        description: null,
      });
      console.log("userData", userData);
      setUserId(userData[0][0]?.id);
      userData && setStep(2);
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Register fail",
        description: error?.response?.data?.msg,
      });
      console.error(error);
      setLoadingState(false);
    }
  };
  const onCreateProfile = async (values) => {
    const profileData = {
      ...values,
      birthday: moment(values?.birthday).format("YYYY-MM-DD"),
      ward: selectedWard,
      userid: userId,
    };
    try {
      const profileDataResponse = await createPatientProfile(profileData);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Create profile success",
        description: null,
      });
      history.push(history.push({ pathname: PATH.LOGIN }));
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Create profile fail",
        description: error?.response?.data?.msg,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getAllProvinceApi();
  }, []);
  return (
    <WrapperRegister>
      <WrapperRegisterForm>
        {step == 1 && (
          <Form
            size="large"
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={RegisterHandler}
            onFinishFailed={onFinishFailed}
          >
            <TitleRegister>Đăng ký</TitleRegister>
            <Form.Item
              size="large"
              id="username"
              label={<RegisterLable>Username</RegisterLable>}
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                placeholder="username"
                onChange={handleChange}
                name="username"
              />
            </Form.Item>

            <Form.Item
              id="password"
              label={<RegisterLable>Password</RegisterLable>}
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                placeholder="password"
                onChange={handleChange}
                name="password"
                type="password"
              />
            </Form.Item>

            <Form.Item
              id="password2"
              label={<RegisterLable>Refill Password</RegisterLable>}
              name="password2"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input
                placeholder="password"
                onChange={handleChange}
                name="password2"
                type="password"
              />
            </Form.Item>

            <Form.Item
              size="large"
              id="email"
              label={<RegisterLable>Email</RegisterLable>}
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="email" onChange={handleChange} name="email" />
            </Form.Item>

            <Link to={PATH.LOGIN}>Đăng nhập</Link>

            <Form.Item {...tailLayout}>
              <RegisterButton type="primary" htmlType="submit">
                Đăng ký
              </RegisterButton>
            </Form.Item>
          </Form>
        )}
        {step == 2 && (
          <Form
            size="large"
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onCreateProfile}
          >
            <TitleRegister>Create Your Profile</TitleRegister>
            <Form.Item
              size="large"
              id="fullname"
              label={<RegisterLable>Full name</RegisterLable>}
              name="fullname"
              rules={[
                {
                  required: true,
                  message: "Please input your fullname!",
                },
              ]}
            >
              <Input placeholder="fullname" name="fullname" />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {" "}
              <Form.Item
                id="birthday"
                label={<RegisterLable>Birthday</RegisterLable>}
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Please input your birthday!",
                  },
                ]}
              >
                <DatePicker
                  name="birthday"
                  style={{ width: "90%" }}
                  disabledDate={disabledDate}
                />
              </Form.Item>
              <Form.Item
                id="gender"
                label={<RegisterLable>Gender</RegisterLable>}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Please select your gender!",
                  },
                ]}
              >
                <Select
                  placeholder="Select your gender"
                  style={{
                    width: "90%%",
                  }}
                  options={[
                    {
                      value: "Male",
                      label: "Male",
                    },
                    {
                      value: "Female",
                      label: "Female",
                    },
                  ]}
                />
              </Form.Item>
            </div>

            <Form.Item
              id="province"
              label={<RegisterLable>Province</RegisterLable>}
              name="province"
              size="large"
            >
              {" "}
              <Select
                style={{
                  width: "100%",
                }}
                placeholder="Select your province"
                onChange={handleChangeProvince}
                options={optionsProvince}
              />
            </Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                id="district"
                label={<RegisterLable>District</RegisterLable>}
                name="district"
                size="large"
              >
                {" "}
                <Select
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
              <Form.Item
                id="ward"
                label={<RegisterLable>Ward</RegisterLable>}
                name="ward"
                size="large"
              >
                {" "}
                <Select
                  disabled={disabledWard}
                  options={optionsWard}
                  style={{
                    width: "100%",
                  }}
                  placeholder="Select your ward"
                  onChange={handleChangeWard}
                />
              </Form.Item>
            </div>
            <Form.Item
              size="large"
              id="address"
              label={<RegisterLable>Address</RegisterLable>}
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input placeholde="Số nhà, tên đường" name="address" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <RegisterButton type="primary" htmlType="submit">
                Submit
              </RegisterButton>
            </Form.Item>
          </Form>
        )}
      </WrapperRegisterForm>
    </WrapperRegister>
  );
};

export default Register;
