import React from "react";
import { Button, Modal, Select, Space, Table } from "antd";
import "../../../assets/styles/component/DoctorAppointment/DoctorAppointment.css";
import Title from "antd/lib/typography/Title";
import {
  createAppt,
  getApptByScheduleId,
  getWorkSchedule,
} from "../../../api/api";
import { useState } from "react";
import { useEffect } from "react";
import moment from "moment";
import { Notification } from "../../Notification/Notification";
import { NOTIFICATION_TYPE } from "../../../constants/common";
// const columns = [
//   {
//     title: "Ngày",
//     dataIndex: "day",
//     key: "day",
//     render: (text) => <a>{text}</a>,
//   },
//   {
//     title: "Thời gian",
//     dataIndex: "time",
//     key: "time",
//   },
//   {
//     title: "Địa điểm",
//     dataIndex: "place",
//     key: "place",
//   },

//   {
//     title: "Đặt lịch",
//     key: "Đặt lịch",
//     render: (_, record) => (
//       <Space size="middle">
//         {/* <a>Invite {record.name}</a> */}
//         <Button>Đặt lịch</Button>
//       </Space>
//     ),
//   },
// ];

// const data = [
//   {
//     key: "1",
//     day: "Thứ Hai",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
//   {
//     key: "2",
//     day: "Thứ Ba",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
//   {
//     key: "3",
//     day: "Thứ Tư",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
//   {
//     key: "4",
//     day: "Thứ Năm",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
//   {
//     key: "5",
//     day: "Thứ Sáu",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
//   {
//     key: "6",
//     day: "Thứ Bảy",
//     time: "08:00 – 12:00",
//     place: "Bệnh viện FV - Tầng 1, tòa nhà F",
//   },
// ];

const DoctorAppointment = ({ businessId }) => {
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [dataWorkSchedule, setDataWorkSchedule] = useState(null);
  const [dataAppointmentByScheduleId, setDataAppointmentByScheduleId] =
    useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  // const handleSelectTimeIdEdit = (value) => {
  //   setSelectedTimeIdEdit(value);
  // };
  const getWorkScheduleData = async () => {
    // const data = await getWorkSchedule(Bacsi?.user_role_id);
    const data = await getWorkSchedule(businessId);
    setDataWorkSchedule(data[0]);
  };
  const showModalTableDataAppointmentByScheduleId = async (record) => {
    const data = await getApptByScheduleId(record.id);
    setSelectedScheduleId(record.id);
    console.log(data);
    setDataAppointmentByScheduleId(data[0]);
    setIsModalOpen(true);
  };
  const createAppointment = async (record) => {
    try {
      const data = {
        pt_id: userInfo.user_role_id,
        sched_id: selectedScheduleId,
        hour_id: record.hour_id,
      };
      await createAppt(data);
      await getApptByScheduleId(selectedScheduleId);
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Đặt lịch thành công",
        description: null,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Đặt lịch thất bại",
        description: error?.response?.data?.msg,
      });
    }
  };
  useEffect(() => {
    getWorkScheduleData();
  }, []);
  const columnsStep1 = [
    {
      width: "100",
      title: "Work Day",
      dataIndex: "workday",
      key: "workday",
      render: (text) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
    },
    {
      width: "100",
      title: "Buổi",
      dataIndex: "time_id",
      key: "time_id",
      render: (time_id) => <a>{time_id == 1 ? "Buổi sáng" : "Buổi chiều"}</a>,
    },
    {
      width: "200",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => showModalTableDataAppointmentByScheduleId(record)}
          >
            Chọn ngày
          </Button>
        </Space>
      ),
    },
  ];
  const columnsStep2 = [
    {
      width: "100",
      title: "Work Day",
      dataIndex: "workday",
      key: "workday",
      render: (text) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
    },
    {
      width: "100",
      title: "Buổi",
      dataIndex: "time_id",
      key: "time_id",
      render: (time_id) => <a>{time_id == 1 ? "Buổi sáng" : "Buổi chiều"}</a>,
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
      title: "Status",
      dataIndex: "appt_id",
      key: "appt_id",
      render: (appt_id, record) => (
        <Space size="middle">
          <Button onClick={() => createAppointment(record)} disabled={appt_id}>
            Đặt lịch
          </Button>
        </Space>
      ),
    },
  ];

  // return <Table columns={columns} dataSource={data} className="mt-3" />;
  return (
    <>
      <Title className="fs-3">Lịch làm việc</Title>

      <Table columns={columnsStep1} dataSource={dataWorkSchedule} />

      <Modal
        title="Chọn khung giờ bạn muốn đặt"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <Table
          columns={columnsStep2}
          dataSource={dataAppointmentByScheduleId}
        />
      </Modal>
    </>
  );
};

export default DoctorAppointment;
