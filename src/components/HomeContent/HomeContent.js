import { Select, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import DoctorList from "../Doctor/DoctorList/DoctorList";
import { useDispatch, useSelector } from "react-redux";
import { getAllProvinceApi } from "../../features/area/areaSlice";
import AreaSelect from "../AreaSelect/AreaSelect";
import { getChatbotResponse } from "../../api/api";
import { NOTIFICATION_TYPE } from "../../constants/common";
import { Notification } from "../Notification/Notification";
import "./HomeContent.scss";

const { TextArea } = Input;
const HomeContent = () => {
  const { provinces } = useSelector((state) => state.area);
  const [question, setQuestion] = useState(null);
  const [res, setRes] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProvinceApi());
  }, []);

  const provincesOptions = provinces.map(
    ({ id: value, name: label, ...rest }) => ({
      value,
      label,
      ...rest,
    })
  );

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleQuestion = (event) => {
    setQuestion(event?.target?.value);
  };

  const sendQuestion = async () => {
    try {
      const chatRes = await getChatbotResponse(question);
      setRes(chatRes?.content);
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

  return (
    <div className="my-3 content-area">
      <div className="chatbox-area">
        <h5>AI tư vấn sức khỏe </h5>
        <div className="chatbox-area-input">
          <Input
            onChange={handleQuestion}
            placeholder="Mô tả triệu chứng bệnh"
          ></Input>
          <Button onClick={sendQuestion} disabled={!question}>
            Send
          </Button>
        </div>
        <TextArea
          rows={4}
          value={res}
          disabled
          placeholder="AI sẽ tư vấn cho bạn sơ lược về sức khỏe cũng như đưa ra lời khuyên"
        />
      </div>
      <div className="find-business-area">
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
                onChange={handleChange}
                options={[
                  {
                    value: 1,
                    label: "Bác Sĩ",
                  },
                  {
                    value: 2,
                    label: "Dược Sĩ",
                  },
                ]}
                size="large"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 mt-2">
        <div className="col-lg-2 col-md-12 col-12 my-1">
          <Input
            placeholder="Tìm kiếm theo tên"
            style={{
              width: 200,
            }}
            size="large"
            className="w-100"
          />
        </div>
        <div className="col-lg-5 col-md-12 col-12 my-1">
          <AreaSelect />
        </div>
        <div className="col-lg-3 col-md-12 col-12 my-1">
          <Select
            placeholder="Chuyên Môn"
            onChange={handleChange}
            options={[
              {
                value: "Cơ - Xương - Khớp",
                label: "Cơ - Xương - Khớp",
              },
              {
                value: "Tai - Mũi - Họng",
                label: "Tai - Mũi - Họng",
              },
              {
                value: "Tim Mạch",
                label: "Tim Mạch",
              },
            ]}
            size="large"
            className="w-100"
          />
        </div>
        <div className="col-lg-2 col-md-12 col-12 my-1">
          <Button type="primary" size="large" className="w-100">
            Tìm kiếm
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="list-doctor my-3">
          <DoctorList />
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
