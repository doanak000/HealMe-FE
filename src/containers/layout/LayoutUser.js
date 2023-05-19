import { Content } from "antd/lib/layout/layout";
import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const LayoutUser = ({ children }) => {
  return (
    <div className="container-fluid overflow-hidden px-0">
      <div>
        <Header />
      </div>
      <div className="container px-0">
        <Content>{children}</Content>
      </div>
      <Footer />
    </div>
  );
};

export default LayoutUser;
