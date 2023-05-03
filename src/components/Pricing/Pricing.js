import React from 'react';
import '../../assets/styles/component/Pricing/Pricing.scss';

const premium = 'SK87VK72HKPG6';
const pro = 'CJQGTMJB6EKA8';

function PayPalForm({ pack }) {
    return (
        <form
            action="https://www.paypal.com/cgi-bin/webscr"
            method="post"
            target="_top"
        >
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value={pack} />
            <button
                type="submit"
                className="pricingTable-firstTable_table__getstart"
                name="submit"
            >
                Đăng kí ngay
            </button>
            <img
                alt=""
                border="0"
                src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
                width="1"
                height="1"
            />
        </form>
    );
}

const Pricing = () => {
    return (
        <div className="pricingTable">
            {/* <h2 className="pricingTable-title">Find a plan that's right for you.</h2>
            <h3 className="pricingTable-subtitle">Every plan comes with a 30-day free trial.</h3> */}
            <ul className="pricingTable-firstTable">
                <li className="pricingTable-firstTable_table">
                    <h1 className="pricingTable-firstTable_table__header">
                        Miễn phí
                    </h1>
                    <p className="pricingTable-firstTable_table__pricing">
                        <span></span>
                        <span>0</span>
                        <span>đ/tháng</span>
                    </p>
                    <ul className="pricingTable-firstTable_table__options">
                        <li>Hiển thị trên website HealMe</li>
                        <li>Đặt & hẹn lịch với bệnh nhân</li>
                        <li>Khám bệnh online</li>
                        <li>Kê đơn thuốc online</li>
                    </ul>
                    <a href="/register">
                        <button className="pricingTable-firstTable_table__getstart">
                            Đăng kí ngay
                        </button>
                    </a>
                </li>
                <li className="pricingTable-firstTable_table">
                    <h1 className="pricingTable-firstTable_table__header">
                        Premium
                    </h1>
                    <p className="pricingTable-firstTable_table__pricing">
                        <span></span>
                        <span>23,000</span>
                        <span>đ/tháng</span>
                    </p>
                    <ul className="pricingTable-firstTable_table__options">
                        <li>
                            Bao gồm tất cả quyền lợi của gói "Miễn phí" kèm thêm
                        </li>
                        <li>Hệ thống quản lí tủ thuốc</li>
                        <li>Hệ thống quản lí giấy tờ</li>
                        <li>Hệ thống nhắc nhở và thông báo tự động</li>
                    </ul>
                    <PayPalForm pack={premium} />
                    {/* <button className="pricingTable-firstTable_table__getstart">
                        Get Started Now
                    </button> */}
                </li>
                <li className="pricingTable-firstTable_table">
                    <h1 className="pricingTable-firstTable_table__header">
                        Pro
                    </h1>
                    <p className="pricingTable-firstTable_table__pricing">
                        <span></span>
                        <span>49,000</span>
                        <span>đ/tháng</span>
                    </p>
                    <ul className="pricingTable-firstTable_table__options">
                        <li>
                            Bao gồm tất cả quyền lợi của gói "Premium" kèm thêm
                        </li>
                        <li>Hệ thống quản lí nhân viên</li>
                        <li>Hệ thống quản lí chuỗi cửa hàng</li>
                    </ul>
                    <PayPalForm pack={pro} />
                    {/* <button className="pricingTable-firstTable_table__getstart">
                        Get Started Now
                    </button> */}
                </li>
            </ul>
        </div>
    );
};

export default Pricing;
