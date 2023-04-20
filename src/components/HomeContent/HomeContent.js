import { Select, Input, Button, Row, Col, Spin } from "antd";
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
import { LoadingOutlined } from "@ant-design/icons";

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
      setIsLoading(true)
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
      { label: "All", value: "" },
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
      { label: "All", value: "" },
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

  return (
    <div className="my-3 content-area">
      <div className="chatbox-area">
        <Row>
          <Col xs={20}>
            <h5>AI tư vấn sức khỏe </h5>
            <div className="chatbox-area-input">
              <Input
                onChange={handleQuestion}
                placeholder="Mô tả triệu chứng bệnh"
              ></Input>
              <Button onClick={sendQuestion} disabled={!question}>
                Gửi
              </Button>
            </div>
            {isLoading ? (<><Spin indicator={<LoadingOutlined spin />} />
              <span>Bạn chờ HealMe một tí nhé!!!</span></>) : <TextArea
              rows={4}
              value={res}
              disabled
              placeholder="AI sẽ tư vấn cho bạn sơ lược về sức khỏe cũng như đưa ra lời khuyên"
            />}
          </Col>
          <Col xs={4}>AHIHI</Col>
        </Row>
      </div>
      <div className="find-business-area" id="dat-lich">
        <h5>Tìm kiếm bác sĩ/dược sĩ</h5>
        <div className="row">
          <div className="col-12 col-md-12 col-lg-12">
            <div className="my-1">
              <Select
                defaultValue="Bác Sĩ"
                style={{
                  width: 100,
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
          </div>
        </div>
        <div className="row w-100 mt-2">
          <div className="col-lg-6 col-md-12 col-12 my-1">
            <Row gutter={8}>
              <Col xs={8}>
                <Select
                  onChange={handleChangeProvince}
                  options={provincesOptions}
                  placeholder="Tỉnh/Thành phố"
                  size="large"
                  className="w-100"
                  value={provinceId}
                />
              </Col>
              <Col xs={8}>
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
              <Col xs={4}>
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
              <Col xs={4}>
                <Button onClick={handleClearFilter} size="large">Xóa bộ lọc</Button>
              </Col>
            </Row>
          </div>
          <div className="col-lg-4 col-md-12 col-12 my-1">
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
          </div>
          <div className="col-lg-2 col-md-12 col-12 my-1">
            <Button
              type="primary"
              size="large"
              className="w-100"
              onClick={handleFilterBusiness}
            >
              Tìm kiếm
            </Button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="list-doctor my-3">
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
