import { Button, Drawer, Form, Input, Select, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../api/api";
const { Option } = Select;
const Users = () => {
  const [open, setOpen] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [dataUsers, setDataUsers] = useState(null);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
    setOpen(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setOpen(false);
  };
  const showDrawerCreate = () => {
    setOpenCreate(true);
  };
  const onCloseCreate = () => {
    setOpenCreate(false);
  };
  const onFinishCreate = (values) => {
    setOpenCreate(false);
  };

  const onFinishFailedCreate = (errorInfo) => {
    setOpenCreate(false);
  };

  useEffect(() => {
    const getAllUsersApi = async () => {
      const data = await getAllUsers();
      setDataUsers(data);
    };
    getAllUsersApi();
  });

  const columns = [
    {
      width: "100",
      title: "UserName",
      dataIndex: "username",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "200",
      title: "User Role",
      dataIndex: "role",
      key: "role",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "200",
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "150",
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "300",
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (text) => <a>{text}</a>,
    },
    {
      width: "200",
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={showDrawer}>Edit</Button>
          <Button>Delete</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Button onClick={showDrawerCreate} style={{ marginBottom: "10px" }}>
        Create User
      </Button>
      <Table columns={columns} dataSource={dataUsers} />
      <Drawer title="Edit User" placement="right" onClose={onClose} open={open}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="adress">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="Create User"
        placement="right"
        onClose={onCloseCreate}
        open={openCreate}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinishCreate={onFinishCreate}
          onFinishFailedCreate={onFinishFailedCreate}
          autoComplete="off"
        >
          <Form.Item label="User Name" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input />
          </Form.Item>
          <Form.Item label="Refill Password" name="password2">
            <Input />
          </Form.Item>
          <Form.Item label="USER ROLE" name="role">
            <Select>
              <Option value="duocSi">Dược sĩ</Option>
              <Option value="bacSi">Bác sĩ</Option>
              <Option value="admin">Admin</Option>
              <Option value="benhNhan">Bệnh Nhân</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Phone Number" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="adress">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "20px" }}
            >
              Submit
            </Button>
            <Button onClick={onCloseCreate}>Cancel</Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default Users;
