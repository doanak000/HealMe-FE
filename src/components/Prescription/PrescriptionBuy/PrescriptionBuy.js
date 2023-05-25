import React, { useState } from 'react'
import { Button, Modal, List } from 'antd'
import moment from 'moment'
import { cancelOrder, getOrderPres, orderPres } from '../../../api/api'
import { Notification } from '../../Notification/Notification'
import { NOTIFICATION_TYPE } from '../../../constants/common'

const PrescriptionBuy = ({ prescription, businessId }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [step, setStep] = useState(1)
    const [orderPresState, setOrderPresState] = useState()
    const handleButtonClick = () => {
        setModalVisible(true)
    }

    const handleModalCancel = () => {
        setModalVisible(false)
    }

    const handleItemButtonClick = async (presId) => {
        try {
            const data = {
                prescription_id: presId,
                pharmacy_id: businessId,
            }
            const res = await orderPres(data)

            const resOrderPres = await getOrderPres(res?.[0]?.[0]?.order_id)
            setOrderPresState(resOrderPres?.[0]?.[0])
            console.log('resOrderPres', resOrderPres?.[0]?.[0])
            setStep(2)
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Đặt mua thành công',
            })
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Có lỗi xảy ra',
            })
        }
    }
    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId)
            setModalVisible(false)
            setStep(1)
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Hủy thành công',
            })
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Có lỗi xảy ra',
            })
        }
    }

    return (
        <>
            <Button
                type="primary"
                onClick={handleButtonClick}
                style={{
                    height: '50px',
                    marginLeft: '10px',
                    marginTop: ' 20px',
                    marginBottom: '20px',
                }}
            >
                Đặt thuốc theo các toa thuốc bạn có tại đây
            </Button>

            <Modal
                title="Các toa thuốc được kê của bạn"
                open={modalVisible}
                onCancel={handleModalCancel}
                footer={[
                    step == 2 && (
                        <Button onClick={() => setStep(1)}>Trở về</Button>
                    ),
                    step == 2 && (
                        <Button
                            onClick={() =>
                                handleCancelOrder(orderPresState?.id)
                            }
                        >
                            Hủy đơn
                        </Button>
                    ),
                ]}
            >
                {step == 1 && (
                    <List
                        style={{ maxHeight: '500px', overflowY: 'scroll' }}
                        dataSource={prescription}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={`Bệnh: ${item?.diagnosis} - Người kê: ${item?.business_name}`}
                                    description={`Ngày tạo: ${moment(
                                        item?.created_date
                                    ).format('YYYY-MM-DD')} Mức giá:${
                                        item?.total_amount
                                    } `}
                                />
                                <Button
                                    onClick={() =>
                                        handleItemButtonClick(item.pres_id)
                                    }
                                    type="primary"
                                    style={{ marginLeft: '30px' }}
                                >
                                    Đặt mua
                                </Button>
                            </List.Item>
                        )}
                    />
                )}
                {step == 2 && (
                    <>
                        <p>
                            {' '}
                            Cảm ơn bạn đã đặt mua, nhà thuốc sẽ liên hệ bạn
                            ngay.
                        </p>
                        <p>
                            Tổng tiền:{' '}
                            <strong>{orderPresState?.total_amount}</strong>
                        </p>
                        {orderPresState?.details.map((item) => {
                            return (
                                <div
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <span>
                                        Thuốc: <strong>{item?.title}</strong> -
                                        Đơn giá: <strong>{item?.price}</strong>
                                    </span>
                                </div>
                            )
                        })}
                    </>
                )}
            </Modal>
        </>
    )
}

export default PrescriptionBuy
