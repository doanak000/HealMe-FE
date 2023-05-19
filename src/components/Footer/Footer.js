import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/HealMe-logo.svg";
import "./Footer.scss";
import { isLoginLayout } from "../../constants/utils";

const FooterContact = () => {
  // const LoginLayout = window.location.href.includes('login') || window.location.href.includes('register');
  // console.log(LoginLayout)

  return (
    <div className="col-lg-4 col-md-6 footer-contact">
      <img src={logo} className="w-50 healme-logo" />

      <p>
        Đường Mạc Đĩnh Chi, khu phố Tân Hòa, phường Đông Hòa, thành phố Dĩ An,
        tỉnh Bình Dương, Việt Nam
        <br />
        <strong>Phone:</strong> +84 79 79 99 281
        <br />
        <strong>Email:</strong> 18120138@student.hcmus.edu.vn
      </p>
    </div>
  );
};



const FooterLinks = () => {
  return (
    <div className="col-lg-2 col-md-6 footer-links">
      <h4>Lối tắt</h4>
      <p className="mb-1">
        <NavLink to="/" className="text-decoration-none">
          Tìm bác sĩ
        </NavLink>
      </p>
      <p className="mb-1">
        <NavLink to="/" className="text-decoration-none">
          Đặt hẹn khám bệnh
        </NavLink>
      </p>
      <p className="mb-1">
        <NavLink to="/" className="text-decoration-none">
          Hỏi đáp
        </NavLink>
      </p>
      <p className="mb-1">
        <NavLink to="/" className="text-decoration-none">
          Đánh giá
        </NavLink>
      </p>
    </div>
  );
};

const FooterValue = () => {
  return (
    <div className="col-lg-2 col-md-6 footer-links">
      <h4>Giá trị cốt lõi</h4>
      <ul>
        <li>Hiệu quả</li>
        <li>Nhanh chóng</li>
        <li>Khoẻ mạnh</li>
        <li>Hạnh phúc</li>
      </ul>
    </div>
  );
};

const FooterMission = () => {
  return (
    <div className="col-lg-4 col-md-6 footer-newsletter">
      <h4>Sứ mệnh của chúng tôi</h4>
      <p>Đồng hành cùng bạn trên con đường khỏe mạnh và hạnh phúc.</p>
    </div>
  );
};

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <FooterContact />
            <FooterLinks />
            <FooterValue />
            <FooterMission />
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="text-center">
          <div className="copyright">
            &copy; 2023 Copyright{" "}
            <strong>
              <span> HealMe</span>
            </strong>
            . All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
