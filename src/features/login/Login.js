import React, { useState } from "react";
// import { useDispatch, useSelector } from 'react-redux'
// import { loginFail, loginSuccess } from './loginSlice'
// import {  useLocation } from 'react-router-dom'
import { Notification } from "../../components/Notification/Notification";
// import { NOTIFICATION_TYPE } from '../../constants/common'
// import { selectTranslation } from '../language/languageSlice'
import { Form, Input, Checkbox } from "antd";
import {
  LoginButton,
  LoginLable,
  TitleLogin,
  WrapperLogin,
  WrapperLoginForm,
} from "./Login.style";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loginSuccess } from "./loginSlice";
import { NOTIFICATION_TYPE, PATH } from "../../constants/common";
import { translation } from "../../configs/translation";
import { login } from "../../api/api.js";
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
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [stopLogin, setStopLogin] = useState(false);
  const [loadingState, setLoadingState] = useState(false);
  const { from } = { from: { pathname: "/" } };
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);

    // return a cleanup function that cancels all subscriptions and asynchronous tasks
    return () => {
      setMounted(false);
    };
  }, []);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event?.target?.name]: event?.target?.value,
    });
  };
  const loginHandler = async () => {
    if (!mounted) {
      return;
    }
    setStopLogin(true);
    setLoadingState(true);
    try {
      const userData = await login(user);
      if (userData.user.role == "admin") {
        throw Error("This is Account Admin");
      }
      dispatch(loginSuccess(userData));
      console.log(userData);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Login success",
        description: null,
      });
      history.replace(from);
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Login fail",
        description: error?.response?.data?.msg,
      });
      console.error(error);
      setLoadingState(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <WrapperLogin>
      <WrapperLoginForm>
        <Form
          size="large"
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={loginHandler}
          onFinishFailed={onFinishFailed}
        >
          <TitleLogin>Đăng nhập</TitleLogin>
          <Form.Item
            size="large"
            id="username"
            label={<LoginLable>Username</LoginLable>}
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
            label={<LoginLable>Password</LoginLable>}
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
          Chưa có tài khoản? <Link to={PATH.REGISTER}>Đăng ký</Link>
          <br />
          <Link to={PATH.FORGOT_PASSWORD}>Quên mật khẩu</Link>
          <Form.Item {...tailLayout}>
            <LoginButton type="primary" htmlType="submit" className="mt-3">
              Đăng nhập
            </LoginButton>
          </Form.Item>
        </Form>
      </WrapperLoginForm>
    </WrapperLogin>
  );
};

export default Login;
