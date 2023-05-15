import React, { memo, useEffect, useState } from 'react'
import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
    Radio,
    Select,
    Layout,
    Menu,
} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../../features/login/loginSlice'
import {
    CalendarOutlined,
    ContainerOutlined,
    DesktopOutlined,
    HomeOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PhoneOutlined,
    PieChartOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons'
import { TitleRegister } from './ProfileDetail.style'
import dayjs from 'dayjs'
import moment from 'moment'
import {
    getAllProvince,
    getClinicProfileApi,
    getDistrictInProvince,
    getFullAddressByWardIdApi,
    getPatientProfileApi,
    getPharmacyProfileApi,
    getUserInfo,
    getWardInDistrict,
    updateAddress,
    updateArrPres,
    updateBusinessProfile,
    updatePatientProfile,
    updateUser,
} from '../../../api/api'
import { NOTIFICATION_TYPE } from '../../../constants/common'
import { Notification } from '../../Notification/Notification'
import { Content, Footer, Header } from 'antd/lib/layout/layout'
import Sider from 'antd/lib/layout/Sider'

const ProfileDetail = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [userProfile, setUserProfile] = useState()
    const [isDisabled, setIsDisabled] = useState(true)

    const [optionsProvince, setOptionsProvince] = useState(null)
    const [optionsDistrict, setOptionsDistrict] = useState(null)
    const [optionsWard, setOptionsWard] = useState(null)
    const [disabledDistrict, setDisabledDistrict] = useState(true)
    const [disabledWard, setDisabledWard] = useState(true)
    const [fullAddressByWardId, setFullAddressByWardId] = useState(null)
    const [provinceState, setProvinceState] = useState(null)
    const [districtState, setDistrictState] = useState(null)
    const [wardState, setWardState] = useState(null)

    const getPatientProfile = async () => {
        const res = await getPatientProfileApi(userInfo.user_role_id)
        setUserProfile(res?.[0]?.[0])
        getFullAddressByWardId(userInfo?.ward_id)
    }
    const getBusinessProfile = async () => {
        if (userInfo?.business_type == 1) {
            const res = await getClinicProfileApi(userInfo.user_role_id)
            setUserProfile(res?.[0]?.[0])
            getFullAddressByWardId(res?.[0]?.[0]?.ward_id)
        } else if (userInfo?.business_type == 2) {
            const res = await getPharmacyProfileApi(userInfo.user_role_id)
            setUserProfile(res?.[0]?.[0])
            getFullAddressByWardId(res?.[0]?.[0]?.ward_id)
        }
    }
    const getAllProvinceApi = async () => {
        const data = await getAllProvince()
        const cookedData = data.map(({ id: value, name: label, ...rest }) => ({
            value,
            label,
            ...rest,
        }))
        setOptionsProvince(cookedData)
    }
    const getDistrictInProvinceApi = async (provinceId) => {
        const data = await getDistrictInProvince(provinceId)
        const cookedData = data?.[0]?.map(
            ({ id: value, title: label, ...rest }) => ({
                value,
                label,
                ...rest,
            })
        )
        setOptionsDistrict(cookedData)
    }
    const getWardInDistrictApi = async (districtId) => {
        const data = await getWardInDistrict(districtId)
        const cookedData = data?.[0]?.map(
            ({ id: value, title: label, ...rest }) => ({
                value,
                label,
                ...rest,
            })
        )
        setOptionsWard(cookedData)
    }

    const getFullAddressByWardId = async (wardId) => {
        const res = await getFullAddressByWardIdApi(wardId)
        setFullAddressByWardId(res?.[0]?.[0])
        getDistrictInProvinceApi(res?.[0]?.[0]?.province_id)
        getWardInDistrictApi(res?.[0]?.[0]?.district_id)
    }
    const handleChangeProvince = async (value) => {
        console.log(value)
        await setDisabledDistrict(true)
        await getDistrictInProvinceApi(value)
        await setDisabledDistrict(false)
        setProvinceState(value)
        console.log(disabledDistrict)
    }
    const handleChangeDistrict = async (value) => {
        await setDisabledWard(true)
        await getWardInDistrictApi(value)
        await setDisabledWard(false)
        setDistrictState(value)
    }
    const handleChangeWard = async (value) => {
        setWardState(value)
    }
    useEffect(() => {
        if (userInfo?.role_id == 2) {
            getPatientProfile()
        } else if (userInfo?.role_id == 3) {
            getBusinessProfile()
        }
        getAllProvinceApi()
    }, [])

    const disabledDate = (current) => {
        return current && current > dayjs().endOf('day')
    }
    const regetUserInfo = async () => {
        const res = await getUserInfo(userInfo?.id)
        localStorage.setItem('userInfo', JSON.stringify(res?.[0]?.[0]))
        // localStorage.setItem("userInfo", JSON.stringify(res?.[0]?.[0]));
    }
    const onFinish = async (values) => {
        const data = {
            ...values,
            district: districtState ?? values.district,
            province: provinceState ?? values.province,
            ward: wardState ?? values.ward,
        }

        // Update patient profile, user, and address information
        const updatePatientProfilePromise = updatePatientProfile(
            userInfo?.user_role_id,
            {
                fullname: data?.fullname,
                dob: moment(data?.dob).format('YYYY-MM-DD'),
                gender: data?.gender,
            }
        )
        const updateBusinessProfilePromise = updateBusinessProfile(
            userInfo?.user_role_id,
            {
                business_name: data?.business_name,
                descr: data?.descr,
            }
        )
        const updateUserPromise = updateUser(userInfo?.id, {
            phone: data?.phone,
            email: data?.email,
        })
        const updateAddressPromise = updateAddress(userInfo?.id, {
            address: data.fulladdress,
            ward: data.ward,
        })
        await Promise.all([
            userInfo?.role_id == 2 && updatePatientProfilePromise,
            userInfo?.role_id == 3 && updateBusinessProfilePromise,
            updateUserPromise,
            updateAddressPromise,
        ])
            .then(() => {})
            .catch(() => {
                Notification({
                    type: NOTIFICATION_TYPE.ERROR,
                    message: 'Có lỗi xảy ra !!!',
                    description: null,
                })
            })

        try {
            regetUserInfo()
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Chỉnh sửa thành công !!!',
                description: null,
            })
            setIsDisabled(true)
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Có lỗi xảy ra !!!',
                description: null,
            })
        }
        // Get user info after all three updates are completed
    }

    return (
        <div>
            <TitleRegister>Hồ sơ cá nhân</TitleRegister>
            {userProfile && fullAddressByWardId && (
                <Form
                    layout="vertical"
                    // style={{
                    //   maxWidth: 600,
                    // }}
                    size="large"
                    onFinish={onFinish}
                    initialValues={{
                        username: userInfo?.username,
                        fullname: userProfile?.fullname,
                        role: userInfo?.role,
                        email: userInfo?.email,
                        dob: moment(userProfile?.date_of_birth, 'YYYY-MM-DD'),
                        phone: userInfo?.phone,
                        fulladdress: userProfile?.fulladdress,
                        gender: userProfile?.gender,
                        province: fullAddressByWardId?.province_id,
                        district: fullAddressByWardId?.district_id,
                        ward: fullAddressByWardId?.ward_id,
                        business_name: userProfile?.business_name,
                        descr: userProfile?.descr,
                    }}
                >
                    <Row gutter={18}>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                                id="username"
                                name="username"
                                label={
                                    <>
                                        <span className="me-1">Username</span>
                                        <span className="text-danger">*</span>
                                    </>
                                }
                            >
                                <Input
                                    defaultValue={userInfo?.username}
                                    name="username"
                                    prefix={<UserOutlined />}
                                    disabled
                                    // onChange={handleChangeUserProfile}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                                label="Loại tài khoản"
                                id="role"
                                name="role"
                            >
                                <Input
                                    defaultValue={userInfo?.role}
                                    name="role"
                                    prefix={<UserOutlined />}
                                    disabled
                                    // onChange={handleChangeUserProfile}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                                label={
                                    <>
                                        <span className="me-1">Email</span>
                                        <span className="text-danger">*</span>
                                    </>
                                }
                                id="email"
                                name="email"
                            >
                                <Input
                                    defaultValue={userInfo?.email}
                                    name="email"
                                    disabled={isDisabled}
                                    prefix={<MailOutlined />}
                                    type="email"
                                    // onChange={handleChangeUserProfile}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                                label="Tên"
                                id={
                                    userInfo?.role_id == 2
                                        ? 'fullname'
                                        : 'business_name'
                                }
                                name={
                                    userInfo?.role_id == 2
                                        ? 'fullname'
                                        : 'business_name'
                                }
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                <Input
                                    name={
                                        userInfo?.role_id == 2
                                            ? 'fullname'
                                            : 'business_name'
                                    }
                                    prefix={<UserOutlined />}
                                    disabled={isDisabled}
                                    defaultValue={
                                        userProfile?.[
                                            userInfo?.role_id == 2
                                                ? 'fullname'
                                                : 'business_name'
                                        ]
                                    }
                                    key={
                                        userProfile?.[
                                            userInfo?.role_id == 2
                                                ? 'fullname'
                                                : 'business_name'
                                        ] +
                                        (userInfo?.role_id == 2
                                            ? 'fullname'
                                            : 'business_name')
                                    }
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            <Form.Item
                                label="Số điện thoại"
                                id="phone"
                                name="phone"
                            >
                                <Input
                                    defaultValue={userInfo?.phone}
                                    name="phone"
                                    prefix={<PhoneOutlined />}
                                    disabled={isDisabled}
                                    key={userInfo?.phone + 'phone'}
                                    // onChange={handleChangeUserProfile}
                                />
                            </Form.Item>
                        </Col>
                        {userInfo?.role_id == 2 && (
                            <>
                                <Col xs={24} sm={12} md={12} lg={12}>
                                    <Form.Item
                                        label="Ngày tháng năm sinh"
                                        id="dob"
                                        name="dob"
                                    >
                                        <DatePicker
                                            className="w-100"
                                            format="YYYY-MM-DD"
                                            prefix={<CalendarOutlined />}
                                            disabled={isDisabled}
                                            name="date_of_birth"
                                            disabledDate={disabledDate}
                                            defaultValue={moment(
                                                userProfile?.date_of_birth,
                                                'YYYY-MM-DD'
                                            )}
                                            key={
                                                userProfile?.date_of_birth +
                                                'dob'
                                            }
                                            // onChange={handleChangePatientProfile}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} sm={12} md={12} lg={12}>
                                    <Form.Item
                                        label="Giới tính"
                                        name="gender"
                                        id="gender"
                                    >
                                        <Radio.Group
                                            defaultValue={userProfile?.gender}
                                            disabled={isDisabled}
                                            key={userProfile?.gender + 'gender'}
                                            // onChange={handleChangePatientProfile}
                                        >
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </>
                        )}
                        {userInfo?.role_id == 3 && (
                            <Col xs={24} sm={12} md={12} lg={12}>
                                <Form.Item
                                    label="Mô tả"
                                    id="descr"
                                    name="descr"
                                >
                                    <Input
                                        defaultValue={userProfile?.descr}
                                        name="descr"
                                        prefix={<HomeOutlined />}
                                        disabled={isDisabled}
                                        key={userProfile?.descr + 'descr'}
                                        // onChange={handleChangePatientProfile}
                                    />
                                </Form.Item>
                            </Col>
                        )}
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {' '}
                            <Form.Item
                                id="province"
                                label={
                                    <>
                                        <span className="me-1">Province</span>
                                        <span className="text-danger">*</span>
                                    </>
                                }
                                name="province"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                ]}
                            >
                                {' '}
                                <Select
                                    dropdownStyle={{
                                        maxHeight: '200px',
                                        overflowY: 'scroll',
                                    }}
                                    disabled={isDisabled}
                                    defaultValue={
                                        fullAddressByWardId?.province_id
                                    }
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Select your province"
                                    onChange={handleChangeProvince}
                                    options={optionsProvince}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {' '}
                            <Form.Item
                                id="district"
                                label={
                                    <>
                                        <span className="me-1">District</span>
                                        <span className="text-danger">*</span>
                                    </>
                                }
                                name="district"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                    // {
                                    //   validator: (_, value) => {
                                    //     if (
                                    //       optionsDistrict.some(
                                    //         (obj) => obj?.value === districtState
                                    //       )
                                    //     ) {
                                    //       return Promise.reject("Địa chỉ không hợp lệ");
                                    //     }
                                    //     return Promise.resolve();
                                    //   },
                                    // },
                                ]}
                            >
                                {' '}
                                <Select
                                    dropdownStyle={{
                                        maxHeight: '200px',
                                        overflowY: 'scroll',
                                    }}
                                    defaultValue={
                                        fullAddressByWardId?.district_id
                                    }
                                    name="district"
                                    // disabled={disabledDistrict}
                                    disabled={isDisabled}
                                    options={optionsDistrict}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Select your province"
                                    onChange={handleChangeDistrict}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={12} lg={12}>
                            {' '}
                            <Form.Item
                                id="ward"
                                label={
                                    <>
                                        <span className="me-1">Ward</span>
                                        <span className="text-danger">*</span>
                                    </>
                                }
                                name="ward"
                                size="large"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống',
                                    },
                                    // {
                                    //   validator: (_, value) => {
                                    //     if (optionsWard.some((obj) => obj?.value === value)) {
                                    //       return Promise.resolve();
                                    //     }
                                    //     return Promise.reject("Địa chỉ không hợp lệ");
                                    //   },
                                    // },
                                ]}
                            >
                                {' '}
                                <Select
                                    dropdownStyle={{
                                        maxHeight: '200px',
                                        overflowY: 'scroll',
                                    }}
                                    defaultValue={fullAddressByWardId?.ward_id}
                                    // disabled={disabledWard}
                                    disabled={isDisabled}
                                    options={optionsWard}
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Select your ward"
                                    onChange={handleChangeWard}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24}>
                            <Form.Item
                                label="Địa chỉ"
                                id="fulladdress"
                                name="fulladdress"
                            >
                                <Input
                                    defaultValue={userProfile?.fulladdress}
                                    name="fulladdress"
                                    prefix={<HomeOutlined />}
                                    disabled={isDisabled}
                                    key={
                                        userProfile?.fulladdress + 'fulladdress'
                                    }
                                    // onChange={handleChangePatientProfile}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Button
                            type="default"
                            size="large"
                            className="me-3"
                            onClick={() => setIsDisabled(false)}
                            disabled={!isDisabled}
                        >
                            Chỉnh sửa
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                            // onClick={handleChangeProfile}
                            disabled={isDisabled}
                        >
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    )
}

export default memo(ProfileDetail)
