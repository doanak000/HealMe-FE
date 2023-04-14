import { Button } from "antd";
import React from "react";
import "../../assets/styles/component/Banner/Banner.css";

const Banner = () => {
  return (
    <div className="banner row my-3 align-items-center">
      <div className="col-lg-6 col-md-12 col-12">
        <div className="banner__info">
          <h1 className="banner__heading fw-bold">
            HealMe - Khám chữa bệnh toàn diện
          </h1>
          <h2 className="banner__desc text-justify">
            Với đội ngũ bác sĩ chuyên nghiệp và nhiều năm kinh nghiệm trong lĩnh
            vực y tế, HealMe sẽ giúp bạn đặt lịch hẹn khám bệnh trực tuyến nhanh
            chóng và dễ dàng. Với sự tiện lợi và chất lượng dịch vụ tốt nhất,
            HealMe sẽ đồng hành cùng bạn trên con đường khỏe mạnh và hạnh phúc.
          </h2>
          <Button
            size="large"
            type="primary"
            className="text-uppercase fw-bold"
          >
            Đặt lịch khám
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
