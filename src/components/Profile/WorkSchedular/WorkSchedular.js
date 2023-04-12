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
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getWorkSchedule, registerWorkSchedule } from "../../../api/api";
import {
  RegisterButton,
  RegisterLable,
  TitleRegister,
} from "./WorkSchedular.style";
import { NOTIFICATION_TYPE } from "../../../constants/common";
import { Notification } from "../../Notification/Notification";
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
const WorkSchedular = () => {
  const dispatch = useDispatch();
  const [timeId, setTimeId] = useState(1);
  const [dataWorkSchedule, setDataWorkSchedule] = useState(null);
  const disabledDate = (current) => {
    return current && current < moment().startOf("day");
  };
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const handleSelectTimeId = (event) => {
    setTimeId(event?.target?.value);
  };
  const onRegisterSchedular = async (values) => {
    const data = {
      ...values,
      date: moment(values?.date).format("YYYY-MM-DD"),
      doc_id: userInfo?.role_id,
      time_id: timeId,
    };
    try {
      await registerWorkSchedule(data);
      await getWorkScheduleData();
      Notification({
        type: NOTIFICATION_TYPE.SUCCESS,
        message: "Register success",
        description: null,
      });
    } catch (error) {
      console.log(error);
      Notification({
        type: NOTIFICATION_TYPE.ERROR,
        message: "Register fail",
        description: error?.response?.data?.msg,
      });
    }
  };

  const getWorkScheduleData = async () => {
    const data = await getWorkSchedule(userInfo?.role_id);
    setDataWorkSchedule(data[0]);
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
      title: "Buổi",
      dataIndex: "time_id",
      key: "time_id",
      render: (time_id) => <a>{time_id == 1 ? "Buổi sáng" : "Buổi chiều"}</a>,
    },
    {
      width: "100",
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      render: (text) => <a>{moment(text).format("YYYY-MM-DD")}</a>,
    },
    {
      width: "200",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => showDrawer(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
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
        <Form
          size="large"
          {...layout}
          name="registerSchedular"
          initialValues={{
            remember: true,
          }}
          onFinish={onRegisterSchedular}
        >
          <TitleRegister>Register Work Schedular</TitleRegister>
          <Form.Item
            size="large"
            id="date"
            label={<RegisterLable>Full name</RegisterLable>}
            name="date"
            rules={[
              {
                required: true,
                message: "Please select date!",
              },
            ]}
          >
            <DatePicker
              name="date"
              style={{ width: "100%" }}
              disabledDate={disabledDate}
            />
          </Form.Item>

          <Form.Item
            id="time_id"
            label={<RegisterLable>Chọn buổi</RegisterLable>}
            name="time_id"
            size="large"
          >
            <Select
              name="time_id"
              key="time_id"
              style={{
                width: "100%",
              }}
              defaultValue={"1"}
              onChange={handleSelectTimeId}
            >
              <Option value="1">Buổi sáng</Option>
              <Option value="2">Buổi chiều</Option>
            </Select>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <RegisterButton type="primary" htmlType="submit">
              Submit
            </RegisterButton>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={dataWorkSchedule} />
      </div>
    </div>
  );
};

export default WorkSchedular;
