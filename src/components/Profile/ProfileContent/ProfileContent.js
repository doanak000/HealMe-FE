import { Tabs } from 'antd'
import React, { useState } from 'react'
import ProfileDetail from '../ProfileDetail/ProfileDetail'
import WorkSchedular from '../WorkSchedular/WorkSchedular'
import PatientAppointment from '../PatientAppointment/PatientAppointment'
import WorkSchedularManage from '../WorkSchedularManage/WorkSchedularManage'
import { CgProfile } from 'react-icons/cg'
import { BsCalendarCheck } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import ChangePassword from '../ChangePassword/ChangePassword'

const ProfileContent = () => {
    const [activeTab, setActiveTab] = useState('1')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleChangeTab = (key) => {
        setActiveTab(key)
    }

    const renderContent = () => {
        switch (activeTab) {
            case '1':
                return <ProfileDetail />
            case '2':
                return userInfo.role_id === 2 ? (
                    <PatientAppointment />
                ) : (
                    <WorkSchedular />
                )
            case '3':
                return userInfo.role_id === 2 ? (
                    <ChangePassword />
                ) : (
                    <WorkSchedularManage />
                )
            default:
                return null
        }
    }

    const items = [
        {
            key: '1',
            label: (
                <>
                    <CgProfile className="fs-5 me-2" />
                    <span>Thông tin cá nhân</span>
                </>
            ),
            children: <ProfileDetail />,
        },
        {
            key: '2',
            label: (
                <div className={userInfo.role_id === 2 ? 'd-block' : 'd-none'}>
                    <BsCalendarCheck className="fs-5 me-2 mb-lg-1" />
                    <span>Lịch khám</span>
                </div>
            ),
            children: <PatientAppointment />,
        },
        {
            key: '3',
            label: (
                <>
                    <RiLockPasswordFill className="fs-5 me-1 mb-lg-1" />
                    <span>Đổi mật khẩu</span>
                </>
            ),
            children: <ChangePassword />,
        },
    ]

    const itemsOfDoctor = [
        {
            key: '1',
            label: `Thông tin cá nhân`,
        },
        {
            key: '2',
            label: `Đăng ký lịch khám`,
        },
        {
            key: '3',
            label: 'Quản lý lịch khám',
        },
    ]

    const tabItems = userInfo.role_id === 2 ? items : itemsOfDoctor

    return (
        <Tabs
            activeKey={activeTab}
            onChange={handleChangeTab}
            size="large"
            className="mx-lg-5"
        >
            {tabItems.map(({ key, label }) => (
                <Tabs.TabPane key={key} tab={label}>
                    {renderContent()}
                </Tabs.TabPane>
            ))}
        </Tabs>
    )
}

export default ProfileContent
