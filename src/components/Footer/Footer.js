import { Image } from "antd";
import React from "react";
import { BsFacebook } from "react-icons/bs";
import { AiFillYoutube } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import "./style.scss";
import "../../../src/assets/styles/component/Footer/Footer.css";

const Footer = () => {
  return (
    // <div
    //   className="row bg-light footer-home px-0 my-0"
    //   style={{ paddingTop: "20px" }}
    // >
    //   <div className="col-lg-3 col-md-6 col-12 footer-item">
    //     <h6 style={{ fontWeight: "bold" }}>Cái gì đó em chưa nghĩ ra</h6>
    //   </div>
    //   <div className="col-lg-3 col-md-6 col-12 footer-item">
    //     <h6 style={{ fontWeight: "bold" }}>Hệ thống HealMe</h6>
    //   </div>
    //   <div className="col-lg-3 col-md-6 col-12 footer-item">
    //     <h6 style={{ fontWeight: "bold" }}>Đường dẫn hữu ích</h6>
    //     <p className="mb-0">
    //       <NavLink to="/" className="text-decoration-none">
    //         Tìm bác sĩ
    //       </NavLink>
    //     </p>
    //     <p className="mb-0">
    //       <NavLink to="/" className="text-decoration-none">
    //         Đặt hẹn khám bệnh
    //       </NavLink>
    //     </p>
    //     <p className="mb-0">
    //       <NavLink to="/" className="text-decoration-none">
    //         Hỏi đáp
    //       </NavLink>
    //     </p>
    //     <p className="mb-0">
    //       <NavLink to="/" className="text-decoration-none">
    //         Đánh giá
    //       </NavLink>
    //     </p>
    //   </div>
    //   <div className="col-lg-3 col-md-6 col-12 footer-item">
    //     <h6 style={{ fontWeight: "bold" }}>Hợp tác quốc tế</h6>
    //     <Image src="https://www.fvhospital.com/wp-content/uploads/2022/09/hcgoncology-logo.png" />
    //     <Image src="https://www.fvhospital.com/wp-content/uploads/2022/09/e-rs-singapore-logo.png" />
    //     <h6 className="mt-3">Theo dõi chúng tôi</h6>
    //     <div>
    //       <BsFacebook className="fs-3 me-2" />
    //       <AiFillYoutube className="fs-2" />
    //     </div>
    //   </div>
    //   <p className="text-center mt-3 py-4 mb-0 bg-secondary bg-gradient text-white">
    //     © 2023 Copyright HealMe. All Rights Reserved.
    //   </p>
    // </div>
    <footer id="footer">
      <div class="footer-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 col-md-6 footer-contact">
              <h3>HealMe</h3>
              <p>
                Đường Mạc Đĩnh Chi, khu phố Tân Hòa, phường Đông Hòa, thành phố
                Dĩ An, tỉnh Bình Dương, Việt Nam
                <br />
                <strong>Phone:</strong> +84 79 79 99 281
                <br />
                <strong>Email:</strong> 18120138@student.hcmus.edu.vn
              </p>
            </div>

            <div className="col-lg-2 col-md-6 footer-links">
              <h6 style={{ fontWeight: "bold" }}>Lối tắt</h6>
              <p className="mb-1 mt-4">
                <NavLink to="/" className="text-decoration-none ">
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

            <div class="col-lg-4 col-md-6 footer-newsletter">
              <h4>Sứ mệnh của chúng tôi</h4>
              <p>Đồng hành cùng bạn trên con đường khỏe mạnh và hạnh phúc.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="container py-4">
        <div class="text-center">
          <div class="copyright">
            &copy; 2023 Copyright{" "}
            <strong>
              <span> HealMe</span>
            </strong>
            . All Rights Reserved.
          </div>
        </div>
      </div>
      {/* <p className="text-center mt-3 py-4 mb-0 bg-secondary bg-gradient text-white">
        © 2023 Copyright HealMe. All Rights Reserved.
      </p> */}
    </footer>
  );
};

export default Footer;
