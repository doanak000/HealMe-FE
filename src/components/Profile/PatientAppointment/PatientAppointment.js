import React, { useEffect, useState } from "react";
import { Button, Table, Space, Modal } from "antd";
import { useDispatch } from "react-redux";
import moment from "moment";
import { NOTIFICATION_TYPE } from "../../../constants/common";
import { Notification } from "../../Notification/Notification";
import {
  cancelAppt,
  getAppt,
  getPresByApptId,
  getPresDetail,
} from "../../../api/api";
import { confirm } from "../../ConfirmModal/ConfirmModal";
const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 24,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 24,
  },
};
const PatientAppointment = () => {
  const dispatch = useDispatch();

  const [apptData, setApptData] = useState(null);
  const [isModalPresOpen, setIsModalPresOpen] = useState(false);
  const [pres, setPres] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const getApptData = async () => {
    const data = await getAppt(userInfo?.user_role_id);
    setApptData(data[0]);
  };
  const handleCancelAppt = async (record) => {
    confirm({
      content: "Bạn có chắc hủy lịch không",
      onOk: async () => {
        try {
          await cancelAppt(record.id);
          await getApptData();
          Notification({
            type: NOTIFICATION_TYPE.SUCCESS,
            message: "Hủy lịch thành công",
            description: null,
          });
        } catch (error) {
          console.log(error);
          Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: "Hủy lịch thất bại",
            description: error?.response?.data?.msg,
          });
        }
      },
    });
  };
  const handleShowModalPres = async (record) => {
    try {
      const getPresByApptIdRes = await getPresByApptId(record.id);
      const getPresDetailRes = await getPresDetail(
        getPresByApptIdRes[0][0]?.pres_id
      );
      const presTemp = {
        ...getPresByApptIdRes[0][0],
        presDetail: getPresDetailRes[0],
      };
      console.log("presTemp", presTemp);
      await setPres(presTemp);
      await setIsModalPresOpen(true);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Có lỗi xảy ra",
        description: error?.response?.data?.msg,
      });
    }
  };

  const columns = [
    {
      width: "100",
      title: "Work Day",
      dataIndex: "workday",
      key: "workday",
      render: (text) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
    },
    {
      width: "100",
      title: "Người khám",
      dataIndex: "business_name",
      key: "business_name",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "100",
      title: "Khung giờ",
      dataIndex: "details",
      key: "details",
      render: (details) => <a>{details}</a>,
    },
    {
      width: "100",
      title: "Link khám",
      dataIndex: "meeting_url",
      key: "meeting_url",
      render: (meeting_url) => (
        <a href={meeting_url} target="_blank">
          Ấn vào đây
        </a>
      ),
    },
    {
      width: "100",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleCancelAppt(record)}>Hủy lịch</Button>
          <Button onClick={() => handleShowModalPres(record)}>
            Xem toa thuốc được kê
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getApptData();
  }, []);
  return (
    <div>
      <div className="register-work-schedular">
        <Table columns={columns} dataSource={apptData} />
        <Modal
          title="Toa thuốc"
          open={isModalPresOpen}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => {
            setIsModalPresOpen(false);
          }}
        >
          <div>
            <p>
              Người khám: <span>{pres?.business_name}</span>
            </p>
            <p>
              Ngày tạo:{" "}
              <span>{moment(pres?.created_date).format("YYYY-MM-DD")}</span>
            </p>
            <p>
              Chẩn đoán: <span>{pres?.diagnosis}</span>
            </p>
            <p>Thuốc được kê:</p>
            {pres?.presDetail.map((item, index) => {
              return (
                <div key={index} style={{ border: "1px solid black" }}>
                  <p>Tên thuốc: {item?.title}</p>
                  <p>Số lương: {item?.dosage}</p>
                  <p>Note: {item?.note}</p>
                  {/* <p>Nhà cung cấp: {item?.supplier}</p>
                  <p>Thành phần: {item?.ingredients}</p> */}
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PatientAppointment;
