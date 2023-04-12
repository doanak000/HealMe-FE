import { Tabs } from "antd";
import React from "react";
import ProfileDetail from "../ProfileDetail/ProfileDetail";
import WorkSchedular from "../WorkSchedular/WorkSchedular";

const ProfileContent = () => {
  const onChange = (key) => {
    console.log(key);
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const items = [
    {
      key: "1",
      label: `Thông tin cá nhân`,
      children: <ProfileDetail />,
    },
    {
      key: "2",
      label: `Lich sử đơn hàng`,
      children: `Content of Tab Pane 2`,
    },
  ];
  const itemsOfDoctor = [
    {
      key: "1",
      label: `Thông tin cá nhân`,
      children: <ProfileDetail />,
    },
    {
      key: "2",
      label: `Đăng ký lịch khám`,
      children: <WorkSchedular />,
    },
  ];
  return (
    <Tabs
      defaultActiveKey="1"
      items={userInfo.id == 2 ? items : itemsOfDoctor}
      onChange={onChange}
      size="large"
    />
  );
};

export default ProfileContent;
