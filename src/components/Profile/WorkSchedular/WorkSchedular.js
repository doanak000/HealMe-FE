import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Radio,
    Table,
    Space,
    Modal,
    Select,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import {
    deleteWorkSchedule,
    getApptByScheduleId,
    getWorkSchedule,
    registerWorkSchedule,
    updateWorkSchedule,
} from '../../../api/api'
import {
    RegisterButton,
    RegisterLable,
    TitleRegister,
} from './WorkSchedular.style'
import { NOTIFICATION_TYPE } from '../../../constants/common'
import { Notification } from '../../Notification/Notification'
import { confirm } from '../../ConfirmModal/ConfirmModal'

const layout = {
    labelCol: {
        span: 24,
    },
    wrapperCol: {
        span: 24,
    },
}
const tailLayout = {
    wrapperCol: {
        span: 24,
    },
}
const WorkSchedular = () => {
    const dispatch = useDispatch()
    const [timeId, setTimeId] = useState(1)
    const [dataWorkSchedule, setDataWorkSchedule] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalDetailOpen, setIsModalDetailOpen] = useState()
    const [schedularId, setSchedularId] = useState(null)
    const [selectedTimeIdEdit, setSelectedTimeIdEdit] = useState(null)
    const [dataApptByScheduleId, setDataApptByScheduleId] = useState(null)
    const disabledDate = (current) => {
        return current && current < moment().startOf('day')
    }
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const handleSelectTimeId = (value) => {
        setTimeId(value)
    }
    const onRegisterSchedular = async (values) => {
        const data = {
            ...values,
            date: moment(values?.date).format('YYYY-MM-DD'),
            doc_id: userInfo?.user_role_id,
            time_id: timeId,
        }
        try {
            await registerWorkSchedule(data)
            await getWorkScheduleData()
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Register success',
                description: null,
            })
        } catch (error) {
            console.log(error)
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Register fail',
                description: error?.response?.data?.msg,
            })
        }
    }

    const getWorkScheduleData = async () => {
        const data = await getWorkSchedule(userInfo?.user_role_id)
        setDataWorkSchedule(data[0])
    }
    const showModal = (record) => {
        setSchedularId(record.id)
        setIsModalOpen(true)
    }
    const showDetailModal = async (record) => {
        try {
            setIsModalDetailOpen(true)
            const res = await getApptByScheduleId(record.id)
            console.log('res', res)
            setDataApptByScheduleId(res[0])
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Hệ thống lỗi',
                description: error?.response?.data?.msg,
            })
        }
    }
    const handleDelete = async (record) => {
        confirm({
            content: 'Bạn có chắc xóa không',
            onOk: async () => {
                try {
                    const res = await deleteWorkSchedule(record.id)
                    await getWorkScheduleData()
                    if (res[0][0].error_message) throw new Error()
                    Notification({
                        type: NOTIFICATION_TYPE.SUCCESS,
                        message: 'Delete success',
                        description: null,
                    })
                } catch (error) {
                    console.log(error)
                    Notification({
                        type: NOTIFICATION_TYPE.ERROR,
                        message: 'Delete fail',
                        description: error?.response?.data?.msg,
                    })
                }
            },
        })
    }

    const columns = [
        {
            width: '100',
            title: 'Ngày',
            dataIndex: 'workday',
            key: 'workday',
            render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
        },
        {
            width: '100',
            title: 'Buổi',
            dataIndex: 'time_id',
            key: 'time_id',
            render: (time_id) => (
                <a>{time_id == 1 ? 'Buổi sáng' : 'Buổi chiều'}</a>
            ),
        },
        {
            width: '100',
            title: 'Ngày tạo',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
        },
        {
            width: '200',
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => showModal(record)}>Edit</Button>
                    <Button onClick={() => handleDelete(record)}>Delete</Button>
                    <Button
                        onClick={() => {
                            showDetailModal(record)
                        }}
                    >
                        Detail
                    </Button>
                </Space>
            ),
        },
    ]
    const columnsDetail = [
        {
            width: '100',
            title: 'Ngày',
            dataIndex: 'workday',
            key: 'workday',
            render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
        },
        {
            width: '100',
            title: 'Buổi',
            dataIndex: 'time_id',
            key: 'time_id',
            render: (time_id) => (
                <a>{time_id == 1 ? 'Buổi sáng' : 'Buổi chiều'}</a>
            ),
        },
        {
            width: '100',
            title: 'Khung giờ',
            dataIndex: 'details',
            key: 'details',
            render: (details) => <a>{details}</a>,
        },
        {
            width: '100',
            title: 'Tên bệnh nhân',
            dataIndex: 'patient_name',
            key: 'patient_name',
            render: (patient_name) => (
                <a>{patient_name ? patient_name : 'Chưa có'}</a>
            ),
        },
        {
            width: '100',
            title: 'Link khám',
            dataIndex: 'meeting_url',
            key: 'meeting_url',
            render: (meeting_url) =>
                meeting_url ? (
                    <a href={meeting_url} target="_blank">
                        Ấn vào đây
                    </a>
                ) : (
                    'Chưa có'
                ),
        },
    ]
    const handleSelectTimeIdEdit = (value) => {
        console.log('value', value)
        setSelectedTimeIdEdit(value)
    }
    const handleOk = async () => {
        try {
            await updateWorkSchedule(schedularId, {
                time_id: selectedTimeIdEdit,
            })
            await getWorkScheduleData()
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Edit success',
                description: null,
            })
            setIsModalOpen(false)
        } catch (error) {
            console.log(error)
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Edit fail',
                description: error?.response?.data?.msg,
            })
        }
    }
    useEffect(() => {
        getWorkScheduleData()
    }, [])
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
                    <TitleRegister>Đăng Kí Lịch Khám</TitleRegister>
                    <Form.Item
                        size="large"
                        id="date"
                        label={<RegisterLable>Chọn ngày</RegisterLable>}
                        name="date"
                        rules={[
                            {
                                required: true,
                                message: 'Please select date!',
                            },
                        ]}
                    >
                        <DatePicker
                            name="date"
                            style={{ width: '100%' }}
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
                            dropdownStyle={{
                                maxHeight: '200px',
                                overflowY: 'scroll',
                            }}
                            name="time_id"
                            key="time_id"
                            style={{
                                width: '100%',
                            }}
                            defaultValue={'1'}
                            onChange={handleSelectTimeId}
                        >
                            <Option value="1">Buổi sáng</Option>
                            <Option value="2">Buổi chiều</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <RegisterButton type="primary" htmlType="submit">
                            Đăng kí
                        </RegisterButton>
                    </Form.Item>
                </Form>
                <Table columns={columns} dataSource={dataWorkSchedule} />
                <Modal
                    title="Chỉnh sửa lịch làm việc"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={() => {
                        setIsModalOpen(false)
                    }}
                >
                    <Select
                        dropdownStyle={{
                            maxHeight: '200px',
                            overflowY: 'scroll',
                        }}
                        style={{
                            width: '100%',
                        }}
                        defaultValue={'1'}
                        onChange={handleSelectTimeIdEdit}
                    >
                        <Option value="1">Buổi sáng</Option>
                        <Option value="2">Buổi chiều</Option>
                    </Select>
                </Modal>
                <div className="schedular-detail">
                    <Modal
                        title="Chi tiết lịch khám"
                        open={isModalDetailOpen}
                        // onOk={handleModalDetailOk}
                        onCancel={() => {
                            setIsModalDetailOpen(false)
                        }}
                        width={'90%'}
                    >
                        <Table
                            columns={columnsDetail}
                            dataSource={dataApptByScheduleId}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default WorkSchedular
