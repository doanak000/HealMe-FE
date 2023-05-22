import React, { useEffect, useState } from 'react'
import { Button, Table, Space } from 'antd'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { NOTIFICATION_TYPE } from '../../../constants/common'
import { Notification } from '../../Notification/Notification'
import { cancelAppt, getAppt } from '../../../api/api'
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
        offset: 8,
        span: 24,
    },
}
const PrescriptionPatientHistory = () => {
    const dispatch = useDispatch()

    const [apptData, setApptData] = useState(null)

    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const getApptData = async () => {
        const data = await getAppt(userInfo?.user_role_id)
        setApptData(data[0])
    }
    const handleCancelAppt = async (record) => {
        confirm({
            content: 'Bạn có chắc hủy lịch không',
            onOk: async () => {
                try {
                    await cancelAppt(record.id)
                    await getApptData()
                    Notification({
                        type: NOTIFICATION_TYPE.SUCCESS,
                        message: 'Hủy lịch thành công',
                        description: null,
                    })
                } catch (error) {
                    console.log(error)
                    Notification({
                        type: NOTIFICATION_TYPE.ERROR,
                        message: 'Hủy lịch thất bại',
                        description: error?.response?.data?.msg,
                    })
                }
            },
        })
    }

    const columns = [
        {
            width: '100',
            title: 'Ngày tạo',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (text) => <a>{moment(text).format('YYYY-MM-DD')}</a>,
        },
        {
            width: '100',
            title: 'Người khám',
            dataIndex: 'business_name',
            key: 'business_name',
            render: (text) => <a>{text}</a>,
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
            title: 'Link khám',
            dataIndex: 'meeting_url',
            key: 'meeting_url',
            render: (meeting_url) => (
                <a href={meeting_url} target="_blank">
                    Ấn vào đây
                </a>
            ),
        },
        {
            width: '100',
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => handleCancelAppt(record)}>
                        Hủy lịch
                    </Button>
                </Space>
            ),
        },
    ]

    useEffect(() => {
        getApptData()
    }, [])
    return (
        <div>
            <div className="register-work-schedular">
                <Table columns={columns} dataSource={apptData} />
            </div>
        </div>
    )
}

export default PrescriptionPatientHistory
