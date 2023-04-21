import { Tabs } from "antd";
import React, { useState } from "react";
import ProfileDetail from "../ProfileDetail/ProfileDetail";
import WorkSchedular from "../WorkSchedular/WorkSchedular";
import { memo } from "react";
import PatientAppointment from "../PatientAppointment/PatientAppointment";
import WorkSchedularManage from "../WorkSchedularManage/WorkSchedularManage";

const ProfileContent = () => {
  const [activeTab, setActiveTab] = useState("1");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleChangeTab = (key) => {
    setActiveTab(key);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "1":
        return <ProfileDetail />;
      case "2":
        return userInfo.role_id === 2 ? (
          <PatientAppointment />
        ) : (
          <WorkSchedular />
        );
      case "3":
        return <WorkSchedularManage />;
      default:
        return null;
    }
  };

  const items = [
    {
      key: "1",
      label: `Thông tin cá nhân`,
    },
    {
      key: "2",
      label: `Lich sử đơn hàng`,
    },
  ];

  const itemsOfDoctor = [
    {
      key: "1",
      label: `Thông tin cá nhân`,
    },
    {
      key: "2",
      label: `Đăng ký lịch khám`,
    },
    {
      key: "3",
      label: "Quản lý lịch khám",
    },
  ];

  const tabItems = userInfo.role_id === 2 ? items : itemsOfDoctor;

  return (
    <Tabs activeKey={activeTab} onChange={handleChangeTab} size="large">
      {tabItems.map(({ key, label }) => (
        <Tabs.TabPane key={key} tab={label}>
          {renderContent()}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
};

export default memo(ProfileContent);
