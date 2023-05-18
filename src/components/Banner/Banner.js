
import { Button } from 'antd'
import React from 'react'
import '../../assets/styles/component/Banner/Banner.css'
import { memo } from "react";

const Banner = () => {
    return (
        <div className="banner row my-3 align-items-center overflow-hidden">
            <div className="col-lg-6 col-md-12 col-12">
                <div className="banner__info mb-4">
                    <h1 className="banner__heading fw-bold">
                        HealMe - Hệ thống tư vấn sức khoẻ toàn diện
                    </h1>
                    <h2 className="banner__desc text-justify">
                        Với đội ngũ bác sĩ chuyên nghiệp và nhiều năm kinh
                        nghiệm trong lĩnh vực y tế, HealMe sẽ giúp bạn tư vấn
                        sức khoẻ, đặt lịch hẹn khám bệnh trực tuyến nhanh chóng
                        và dễ dàng. Với sự tiện lợi và chất lượng dịch vụ tốt
                        nhất, HealMe sẽ đồng hành cùng bạn trên con đường khỏe
                        mạnh và hạnh phúc.
                    </h2>
                    <Button
                        size="large"
                        type="primary"
                        className="text-uppercase fw-bold banner__button"
                    >
                        Tư vấn ngay
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Banner
