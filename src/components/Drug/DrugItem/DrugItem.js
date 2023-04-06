import { Col, Image, Row } from "antd";
import React from "react";

const DrugItem = () => {
  return (
    <Row className="my-2 align-items-center">
      <Col span={3}>
        <Image src="https://picsum.photos/100" />
      </Col>
      <Col span={7}>
        <h5>Tên thuốc</h5>
        <span>Cách sử dụng</span>
      </Col>
      <Col span={7}>Số lượng</Col>
      <Col span={7}>Thành tiền</Col>
    </Row>
  );
};

export default DrugItem;
