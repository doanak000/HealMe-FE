import { Select, Input, Button, Row, Col, Spin, List, Empty } from "antd";
import React, { useEffect, useState } from "react";
import DoctorList from "../Doctor/DoctorList/DoctorList";
import {
  getAllClinic,
  getAllPharmacy,
  getAllProvince,
  getChatbotResponse,
  getDistrictInProvince,
  getFilterClinicByDeptIdApi,
  getFilterPharmacy,
  getWardInDistrict,
} from "../../api/api";
import { NOTIFICATION_TYPE } from "../../constants/common";
import { Notification } from "../Notification/Notification";
import "./HomeContent.scss";
import {
  LoadingOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const HomeContent = () => {
  const [question, setQuestion] = useState(null);
  const [res, setRes] = useState(null);

  const [filterValue, setFilterValue] = useState(1);
  const [departmentId, setDepartmentId] = useState("");

  const [clinics, setClinics] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");
  const [disabledDistrict, setDisableDistrict] = useState(true);
  const [disabledWard, setDisableWard] = useState(true);
  const [districtsOptions, setDistrictsOptions] = useState([]);
  const [disabledDepartment, setDisabledDepartment] = useState(false);
  const [wardsOptions, setWardsOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(true);
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    try {
      setIsLoading(true);
      const response = await getChatbotResponse(inputValue);

      const newMessage = {
        text: inputValue,
        author: "user",
      };
      const resMessage = {
        text: response?.content,
        author: "chatbot",
      };

      setChatHistory([...chatHistory, newMessage, resMessage]);

      setInputValue("");
      setIsLoading(false);
    } catch (err) {
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Chatbot got some mistakes",
        description: null,
      });
      setLoadingState(false);
    }
  };
  useEffect(async () => {
    await getAllClinic().then((res) => setClinics(res));
    await getAllProvince().then((res) =>
      setProvinces([{ label: "All", value: "" }, ...res])
    );
    await getAllPharmacy().then((res) => setPharmacy(res));
  }, []);

  const handleQuestion = (event) => {
    setQuestion(event?.target?.value);
  };

  const sendQuestion = async () => {
    try {
      setIsLoading(true);
      const chatRes = await getChatbotResponse(question);
      setRes(chatRes?.content);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Chatbot got some mistakes",
        description: null,
      });
      console.error(error);
      setLoadingState(false);
    }
  };

  const provincesOptions = provinces.map(
    ({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  const handleChangeProvince = async (value) => {
    setProvinceId(value);
    const result = await getDistrictInProvince(value);
    if (result?.[0].length < 1) return;
    setDisableDistrict(false);
    setDistrictsOptions([
      { label: "Quận", value: "" },
      ...result[0].map(({ id: value, title: label, ...rest }) => ({
        value,
        label,
        ...rest,
      })),
    ]);
  };

  const handleChangeDistrict = async (value) => {
    setDistrictId(value);
    const result = await getWardInDistrict(value);
    setDisableWard(false);
    setWardsOptions([
      { label: "Huyện", value: "" },
      ...result[0].map(({ id: value, title: label, ...rest }) => ({
        value,
        label,
        ...rest,
      })),
    ]);
  };

  const handleFilterBusiness = async () => {
    try {
      if (filterValue === 1) {
        setDisabledDepartment(false);
        const result = await getFilterClinicByDeptIdApi({
          dept: departmentId,
          ward: wardId,
          district: districtId === "" ? districtId : districtId - 1,
          province: provinceId,
        });
        setClinics(result[0]);
      } else {
        setDisabledDepartment(true);
        const result = await getFilterPharmacy({
          ward: wardId,
          district: districtId === "" ? districtId : districtId - 1,
          province: provinceId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleClearFilter = async () => {
    setProvinceId("");
    setDistrictId("");
    setWardId("");
    try {
      if (filterValue === 1) {
        setDisabledDepartment(false);
        const result = await getFilterClinicByDeptIdApi({
          dept: "",
          ward: "",
          district: "",
          province: "",
        });
        setClinics(result[0]);
      } else {
        setDisabledDepartment(true);
        const result = await getFilterPharmacy({
          ward: "",
          district: "",
          province: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const NoData = () => (
  //   <Empty
  //     image={<RobotOutlined style={{ fontSize: 48 }} />}
  //     description={
  //       <span>
  //         "Bạn có cần thông tin gì về các căn bệnh không? Hãy thử hỏi chatbot
  //         nào !"
  //       </span>
  //     }
  //   />
  // );

  return (
    <div className="my-3 content-area">
      <div className="chatbox-area mx-3 mx-lg-0" style={{ background: "#deeaf4" }}>
        <h5 className="text-center">AI tư vấn sức khỏe </h5>
        <div className="chatbot-container w-100 px-2">
          {showChatbot && (
            <List
              // locale={{ emptyText: <NoData /> }}
              style={{ height: "250px", overflowY: "scroll", padding: '0 20px', textAlign: 'justify', scrollbarWidth: 'thin' }}
              dataSource={chatHistory}
              renderItem={(item) => (
                <List.Item>
                  {item.author === "chatbot" ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <RobotOutlined style={{ marginRight: "10px" }} />
                      {item.text}
                    </div>
                  ) : (
                    <div
                      style={{
                        alignItems: "center",
                        width: "100%",
                        display: "flex",
                        justifyContent: "end",
                      }}
                    >
                      {item.text}{" "}
                      <UserOutlined
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                      />
                    </div>
                  )}
                </List.Item>
              )}
            />
          )}
          <Input.Search
            style={{ marginTop: "15px" }}
            value={inputValue}
            onChange={handleInputChange}
            onSearch={handleSendMessage}
            enterButton={
              <Button
                disabled={isLoading}
                type="primary"
                style={{
                  backgroundColor: "#1890FF",
                  width: "80px",
                }}
              >
                {isLoading ? (
                  <Spin
                    indicator={<LoadingOutlined spin />}
                    style={{ color: "white" }}
                  />
                ) : (
                  "Gửi"
                )}
              </Button>
            }
            size="large"
          />
        </div>
      </div>
      <div className="find-business-area px-2 business" id="business" name="business">
        <h5>Tìm kiếm phòng khám/ nhà thuốc</h5>
        <div className="my-1">
          <Select
            defaultValue={1}
            style={{
              color: "#2d4964",
            }}
            onChange={(value) => setFilterValue(value)}
            options={[
              {
                value: 1,
                label: "Phòng khám",
              },
              {
                value: 2,
                label: "Nhà thuốc",
              },
            ]}
            size="large"
            onBlur={handleFilterBusiness}
          />
        </div>
        <Row gutter={8}>
          <Col xs={24} sm={24} md={8} lg={4} className="my-1">
            <Select
              onChange={handleChangeProvince}
              options={provincesOptions}
              placeholder="Tỉnh/Thành phố"
              size="large"
              className="w-100"
              value={provinceId}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={4} className="my-1">
            <Select
              onChange={handleChangeDistrict}
              options={districtsOptions}
              placeholder="Quận"
              size="large"
              className="w-100"
              disabled={disabledDistrict || provinceId === ""}
              value={districtId}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={4} className="my-1">
            <Select
              onChange={(value) => setWardId(value)}
              options={wardsOptions}
              placeholder="Huyện"
              size="large"
              className="w-100"
              disabled={disabledWard || districtId === ""}
              value={wardId}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} className="my-1">
            <Select
              placeholder="Chuyên Môn"
              onChange={(value) => setDepartmentId(value)}
              options={[
                {
                  value: 1,
                  label: "Tai - Mũi - Họng",
                },
                {
                  value: 2,
                  label: "Hô hấp",
                },
                {
                  value: 3,
                  label: "Dị ứng - Miễn dịch",
                },
                {
                  value: 4,
                  label: "Y học cổ truyền",
                },
                {
                  value: 5,
                  label: "Vật lý trị liệu - Phục hồi chức năng",
                },
                {
                  value: 6,
                  label: "Răng - Hàm - Mặt",
                },
                {
                  value: 7,
                  label: "Cơ Xương Khớp",
                },
                {
                  value: 8,
                  label: "Dinh dưỡng",
                },
                {
                  value: 9,
                  label: "Thận - Tiết niệu",
                },
                {
                  value: 10,
                  label: "Tim mạch",
                },
                {
                  value: 11,
                  label: "Chấn thương chỉnh hình - Cột sống",
                },
                {
                  value: 12,
                  label: "Thần kinh",
                },
                {
                  value: 13,
                  label: "Nhãn khoa",
                },
                {
                  value: 14,
                  label: "Nội tiết",
                },
                {
                  value: 15,
                  label: "Ung bướu",
                },
                {
                  value: 16,
                  label: "Vô sinh - Hiếm muộn",
                },
                {
                  value: 17,
                  label: "Nhi",
                },
                {
                  value: 18,
                  label: "Sản phụ khoa",
                },
                {
                  value: 19,
                  label: "Tiêu hóa - Gan mật",
                },
                {
                  value: 20,
                  label: "Da liễu - Thẩm mỹ",
                },
                {
                  value: 21,
                  label: "Đa Khoa",
                },
              ]}
              size="large"
              className="w-100"
              disabled={disabledDepartment}
            />
          </Col>
          <Col xs={12} lg={4} className="my-1">
            <Button onClick={handleClearFilter} size="large" className="w-100">
              Xóa bộ lọc
            </Button>
          </Col>
          <Col xs={12} lg={4} className="my-1">
            <Button
              type="primary"
              size="large"
              className="w-100"
              onClick={handleFilterBusiness}
            >
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </div>

      <div className="row px-3 px-lg-0">
        <div className="list-doctor my-3" id="doctor-list">
          <DoctorList
            clinics={clinics}
            pharmacy={pharmacy}
            filterValue={filterValue}
          />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
