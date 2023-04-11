import { Col, Image, Row } from "antd";
import React from "react";

const DrugItem = (props) => {
  const { item } = props;
  return (
    <Row className="my-2 align-items-center">
      <Col span={14}>
        <p className="mb-0 fw-bold">Tên thuốc: {item.title}</p>
        <small>Cách sử dụng: {item.note}</small>
      </Col>
      <Col span={6}>
        <span>Số lượng</span>
      </Col>
      <Col span={4}>
        <span>Thành tiền</span>
      </Col>
    </Row>
  );
};

export default DrugItem;
