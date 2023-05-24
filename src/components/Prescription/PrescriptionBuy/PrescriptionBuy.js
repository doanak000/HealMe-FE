import React, { useState } from 'react'
import { Button, Modal, List } from 'antd'
import moment from 'moment'

const PrescriptionBuy = ({ prescription }) => {
    const [modalVisible, setModalVisible] = useState(false)

    const handleButtonClick = () => {
        setModalVisible(true)
    }

    const handleModalCancel = () => {
        setModalVisible(false)
    }

    const handleItemButtonClick = (presId) => {
        // Handle action with item.pres_id here
        console.log(`Prescription ID: ${presId}`)
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
                visible={modalVisible}
                onCancel={handleModalCancel}
                footer={null}
            >
                <List
                    style={{ maxHeight: '500px', overflowY: 'scroll' }}
                    dataSource={prescription}
                    renderItem={(item) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`Bệnh: ${item.diagnosis} - Người kê: ${item.business_name}`}
                                description={`Created Date: ${moment(
                                    item.created_date
                                ).format('YYYY-MM-DD')}`}
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
            </Modal>
        </>
    )
}

export default PrescriptionBuy
