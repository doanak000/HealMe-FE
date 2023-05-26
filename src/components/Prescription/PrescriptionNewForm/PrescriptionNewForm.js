import React, { useEffect, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Input, Space, Select, Modal } from 'antd'
import debounce from 'lodash/debounce'
import {
    getPharmacyMedicine,
    getPresDetail,
    getSearchMedicine,
    orderPres,
    updateArrPres,
} from '../../../api/api'
import { Notification } from '../../Notification/Notification'
import { NOTIFICATION_TYPE } from '../../../constants/common'

const PrescriptionNewForm = ({ presId, setIsCreatePresModalOpen }) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [form] = Form.useForm()
    const [presDetailRes, setPresDetailRes] = useState(null)
    const [optionsMedicine, setOptionsMedicine] = useState([])
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [isModalVisible, setIsModalVisible] = useState(false)

    const initialState = [
        {
            med_id: '',
            dosage: '',
            note: '',
        },
    ]
    const onFinish = async (values) => {
        try {
            await updateArrPres(presId, { details: values.details })
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Thành công',
                description: null,
            })
            userInfo.business_type == 2 && showModal()
            setIsCreatePresModalOpen(false)
        } catch (error) {
            console.log(error)
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Hệ thống lỗi',
                description: error?.response?.data?.msg,
            })
        }
    }
    const getPresDetailsById = async (presId) => {
        const tempRes = await getPresDetail(presId)
        setPresDetailRes(tempRes[0])
        form.setFieldsValue({
            details: tempRes?.[0]?.length < 1 ? initialState : tempRes[0],
        })
    }
    const getOptionsMedicine = async () => {
        if (userInfo?.business_type == 1) {
            const res = await getSearchMedicine({ search_text: '' })
            const newArrayOfObj = res?.[0].map(
                ({ id: value, title: label, ...rest }) => ({
                    value,
                    label,
                    ...rest,
                })
            )
            setOptionsMedicine(newArrayOfObj)
        } else if (userInfo?.business_type == 2) {
            const res = await getPharmacyMedicine(userInfo?.user_role_id)
            const newArrayOfObj = res?.[0].map(
                ({ id: value, title: label, ...rest }) => ({
                    value,
                    label,
                    ...rest,
                })
            )
            setOptionsMedicine(newArrayOfObj)
        }
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleOk = async () => {
        try {
            const data = {
                prescription_id: presId,
                pharmacy_id: userInfo?.user_role_id,
            }
            await orderPres(data)
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Đặt mua thành công',
            })
            setIsModalVisible(false)
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Có lỗi xảy ra',
            })
        }
    }

    useEffect(() => {
        getPresDetailsById(presId)
        getOptionsMedicine()
    }, [])

    return (
        <>
            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                autoComplete="off"
                size="large"
                form={form}
            >
                <Form.List name="details">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    {optionsMedicine?.length > 0 && (
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'med_id']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Thiếu tên thuốc',
                                                },
                                            ]}
                                        >
                                            <Select
                                                dropdownStyle={{
                                                    maxHeight: '200px',
                                                    overflowY: 'scroll',
                                                }}
                                                showSearch
                                                loading={loading}
                                                style={{
                                                    width: 200,
                                                }}
                                                placeholder="Nhập tên thuốc"
                                                optionFilterProp="children"
                                                filterOption={(input, option) =>
                                                    (
                                                        option?.label ?? ''
                                                    )?.includes(input)
                                                }
                                                filterSort={(
                                                    optionA,
                                                    optionB
                                                ) =>
                                                    (optionA?.label ?? '')
                                                        ?.toLowerCase()
                                                        ?.localeCompare(
                                                            (
                                                                optionB?.label ??
                                                                ''
                                                            )?.toLowerCase()
                                                        )
                                                }
                                                options={optionsMedicine}
                                            >
                                                {optionsMedicine?.map(
                                                    (option) => (
                                                        <Select.Option
                                                            key={option.id}
                                                            value={option.id}
                                                        >
                                                            {option.title}
                                                        </Select.Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                    )}
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'dosage']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Xin mời nhập số lượng',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập số lượng" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'note']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Xin mời nhập cách dùng',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập cách dùng" />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                    />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    className="w-25 me-4"
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <PlusOutlined />
                                        <p style={{ marginLeft: '5px' }}>
                                            Thêm
                                        </p>
                                    </div>
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Xác nhận toa thuốc
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
            <Modal
                title="Book Prescription"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleOk}
            >
                <p>Xác nhận đặt đơn thuốc này cho khách hàng ?</p>
            </Modal>
        </>
    )
}

export default PrescriptionNewForm
