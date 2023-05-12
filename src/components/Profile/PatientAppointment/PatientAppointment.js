import React, { useEffect, useState } from "react";
import { Button, Table, Space, Modal, Tag, Typography, Input, Card } from "antd";
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
import { SearchOutlined } from "@ant-design/icons";
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
      console.log(getPresByApptIdRes[0][0]);
      console.log(getPresDetailRes[0]);
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
      render: (text, today) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search work day"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        moment(record.workday)
          .format("YYYY-MM-DD")
          .toLowerCase()
          .includes(value.toLowerCase()),
      render: (text) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
    },
    {
      width: "100",
      title: "Người khám",
      dataIndex: "business_name",
      key: "business_name",
      render: (text) => <a>{text}</a>,
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search tên bệnh nhân"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
              confirm();
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record?.business_name
          ?.toString()
          ?.toLowerCase()
          ?.includes(value.toLowerCase()),
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
        meeting_url ? <a href={meeting_url} target="_blank">
          Ấn vào đây
        </a> : <Typography.Text disabled>Không có lịch khám</Typography.Text>
      ),
    },
    {
      width: "100",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleCancelAppt(record)} type="danger">
            Hủy Lịch
          </Button>
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

  console.log(pres)

  return (
    <div>
      <div className="register-work-schedular">
        <Table columns={columns} dataSource={apptData} loading={apptData && false} scroll={'x'} />
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
                <Card key={index} className="my-2 text-white" bordered={false} style={{
                  background: "radial-gradient(circle at top, #007bff , #527cc6)"
                }}>
                  <p className="mb-1 fs-5 fw-bold">{item?.title}</p>
                  <p className="mb-0">Số lương: {item?.dosage}</p>
                  <p className="mb-0">Cách dùng: {item?.note}</p>
                  {/* <p>Nhà cung cấp: {item?.supplier}</p>
                  <p>Thành phần: {item?.ingredients}</p> */}
                </Card>
              );
            })}
          </div>
        </Modal>
      </div >
    </div >
  );
};

export default PatientAppointment;
