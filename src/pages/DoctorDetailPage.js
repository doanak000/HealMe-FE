import { Col, Row } from "antd";
import React from "react";
import DoctorAppointment from "../components/Doctor/DoctorAppointment/DoctorAppointment";
import DoctorItem from "../components/Doctor/DoctorItem/DoctorItem";
import LayoutUser from "../containers/layout/LayoutUser";
import { useParams } from "react-router-dom";

const DoctorDetailPage = () => {
  const { id } = useParams();
  console.log("id", id);
  return (
    <LayoutUser>
      <Row gutter={20}>
        <Col lg={10} md={24}>
          {/* <DoctorItem /> */}
        </Col>
        <Col lg={14} md={24}>
          <DoctorAppointment businessId={id} />
        </Col>
      </Row>
    </LayoutUser>
  );
};

export default DoctorDetailPage;
