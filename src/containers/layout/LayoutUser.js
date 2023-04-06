import { Content } from "antd/lib/layout/layout";
import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const LayoutUser = ({ children }) => {
  return (
    <div className="container">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
};

export default LayoutUser;
