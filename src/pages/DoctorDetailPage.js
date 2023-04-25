import { Col, Row } from "antd";
import React from "react";
import DoctorAppointment from "../components/Doctor/DoctorAppointment/DoctorAppointment";
import DoctorItem from "../components/Doctor/DoctorItem/DoctorItem";
import { useParams } from "react-router-dom";

const DoctorDetailPage = () => {
  const { id } = useParams();
  return (
    <div>
      <Row gutter={24}>
        <Col lg={24} md={24} className="my-2">
          <DoctorItem businessId={id} />
        </Col>
        <Col lg={24} md={24}>
          <DoctorAppointment businessId={id} className="my-2" />
        </Col>
      </Row>
    </div>
  );
};

export default DoctorDetailPage;
