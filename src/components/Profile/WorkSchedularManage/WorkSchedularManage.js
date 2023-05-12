import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Radio,
  Select,
  Table,
  Space,
  Modal,
  Dropdown,
  Menu,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  createPres,
  deleteWorkSchedule,
  getApptByScheduleId,
  getPresByApptId,
  getWorkSchedule,
  registerWorkSchedule,
  updatePresDiagnois,
  updateWorkSchedule,
} from "../../../api/api";

import { NOTIFICATION_TYPE } from "../../../constants/common";
import { Notification } from "../../Notification/Notification";
import { confirm } from "../../ConfirmModal/ConfirmModal";
import {
  FilterFilled,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import PrescriptionNewForm from "../../Prescription/PrescriptionNewForm/PrescriptionNewForm";
import { memo } from "react";
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
const WorkSchedularManage = () => {
  const dispatch = useDispatch();
  const [timeId, setTimeId] = useState(1);
  const [dataWorkSchedule, setDataWorkSchedule] = useState(null);
  const [dataApptByScheduleIdTotal, setDataApptByScheduleIdTotal] =
    useState(null);
  const [diagnosisState, setDiagonosisState] = useState("");
  const [createPresState, setCreatePresState] = useState(null);
  const [isCreatePresModalOpen, setIsCreatePresModalOpen] = useState(false);
  const [presId, setPresId] = useState(null);
  const [step, setStep] = useState(1);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const getWorkScheduleData = async () => {
    const data = await getWorkSchedule(userInfo?.user_role_id);
    setDataWorkSchedule(data[0]);
    const arr = data[0].map((obj) => obj.id);
    const getApptByScheduleIdTotal = [];

    for (const item of arr) {
      const res = await getApptByScheduleId(item);
      if (res[0]) {
        getApptByScheduleIdTotal.push(...res[0]);
      }
    }

    await Promise.all(getApptByScheduleIdTotal);
    setDataApptByScheduleIdTotal(
      getApptByScheduleIdTotal.filter((item) => item.appt_id !== null)
    );
  };
  const showCreatePresModal = async (record) => {
    setCreatePresState(record);
    const res = await getPresByApptId(record?.appt_id);
    setDiagonosisState(res?.[0]?.[0]?.diagnosis);
    setIsCreatePresModalOpen(true);
  };
  const onChangeDiagonosis = (event) => {
    setDiagonosisState(event?.target?.value);
  };
  const handleCreatePres = async () => {
    try {
      const res = await getPresByApptId(createPresState.appt_id);
      if (res?.[0].length < 1) {
        const resCreatePres = await createPres({
          pt_id: createPresState.pt_id,
          doc_id: createPresState.doc_id,
          appt_id: createPresState.appt_id,
          diagnosis: diagnosisState,
        });
        setPresId(resCreatePres[0][0].pres_id);
      } else {
        const resUpdatePres = await updatePresDiagnois(res?.[0]?.[0]?.pres_id, {
          diagnosis: diagnosisState,
        });
        setPresId(res?.[0]?.[0]?.pres_id);
      }
      setStep(2);
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Có lỗi xảy ra",
        description: error?.response?.data?.msg,
      });
    }
  };
  const columnsDetail = [
    {
      width: "100",
      title: "Work Day",
      dataIndex: "workday",
      key: "workday",
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
      title: "Buổi",
      dataIndex: "time_id",
      key: "time_id",
      filters: [
        {
          text: "Buổi sáng",
          value: "1",
        },
        {
          text: "Buổi chiều",
          value: "2",
        },
      ],
      onFilter: (value, record) => value.includes(record?.time_id),
      filterSearch: true,

      render: (time_id) => (time_id === 1 ? "Buổi sáng" : "Buổi chiều"),
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
      title: "Tên bệnh nhân",
      dataIndex: "patient_name",
      key: "patient_name",
      render: (patient_name) => (
        <a>{patient_name ? patient_name : "Chưa có"}</a>
      ),
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
        record?.patient_name
          ?.toString()
          ?.toLowerCase()
          ?.includes(value.toLowerCase()),
    },
    {
      width: "100",
      title: "Link khám",
      dataIndex: "meeting_url",
      key: "meeting_url",
      render: (meeting_url) =>
        meeting_url ? (
          <a href={meeting_url} target="_blank">
            Ấn vào đây
          </a>
        ) : (
          "Chưa có"
        ),
    },
    {
      width: "100",
      title: "Kê thuốc",
      key: "createpres",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              showCreatePresModal(record);
            }}
          >
            Kê thuốc
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getWorkScheduleData();
  }, []);
  return (
    <div>
      <div className="register-work-schedular">
        <Table columns={columnsDetail} dataSource={dataApptByScheduleIdTotal} />
        <Modal
          title="Kê thuốc"
          open={isCreatePresModalOpen}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={() => {
            setIsCreatePresModalOpen(false);
          }}
          footer={[
            step == 2 && (
              <Button
                onClick={() => {
                  setStep(1);
                }}
              >
                Quay lại
              </Button>
            ),
            <Button
              key="cancel"
              onClick={() => {
                setIsCreatePresModalOpen(false);
              }}
            >
              Cancel
            </Button>,
          ]}
        >
          {step == 1 && (
            <>
              {" "}
              <p>Chuẩn đoán :</p>
              <Input
                name="diagonosis"
                onChange={onChangeDiagonosis}
                value={diagnosisState}
              ></Input>
              <Button
                onClick={handleCreatePres}
                style={{ marginTop: "20px", marginBottom: "20px" }}
              >
                Submit bệnh
              </Button>
            </>
          )}

          {step == 2 && (
            <>
              <PrescriptionNewForm
                presId={presId}
                setIsCreatePresModalOpen={setIsCreatePresModalOpen}
              />
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default memo(WorkSchedularManage);
