import React from "react";
import Banner from "../components/Banner/Banner";
import HomeContent from "../components/HomeContent/HomeContent";
import { BackTop } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <div>
      <Banner />
      <HomeContent />
      <BackTop>
        <ArrowUpOutlined className="btn btn-primary" />
      </BackTop>
    </div>
  );
};

export default HomePage;
