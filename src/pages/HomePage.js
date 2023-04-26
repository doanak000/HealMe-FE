import React from "react";
import Banner from "../components/Banner/Banner";
import HomeContent from "../components/HomeContent/HomeContent";
import { BackTop, Col, Row } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

const HomePage = () => {
  return (
    <Row>
      <Col xs={24} md={24} sm={24}>
        <Banner />
      </Col>
      <Col xs={24} md={24} sm={24}>
        <HomeContent />
      </Col>
      <BackTop>
        <ArrowUpOutlined className="btn btn-primary" />
      </BackTop>
    </Row>
  );
};

export default HomePage;
