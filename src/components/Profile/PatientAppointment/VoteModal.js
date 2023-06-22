import React from 'react'
import { Modal, Form, Input, Rate } from 'antd'
import { createReview } from '../../../api/api'
import { Notification } from '../../Notification/Notification'
import { NOTIFICATION_TYPE } from '../../../constants/common'

const VoteModal = ({ visible, onClose, data }) => {
    const [form] = Form.useForm()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const handleOk = () => {
        form.validateFields().then(async (values) => {
            // Submit the values to the API
            console.log(data)
            console.log(values)
            const dataApi = {
                user_id: userInfo?.id,
                business_id: data.business_id,
                rating: values.rating,
                comment: values.comment,
            }
            try {
                await createReview(dataApi)
                Notification({
                    type: NOTIFICATION_TYPE.SUCCESS,
                    message: 'Đánh giá thành công',
                    description: null,
                })
                onClose()
            } catch (error) {
                console.log(error)
                Notification({
                    type: NOTIFICATION_TYPE.ERROR,
                    message: 'Đánh giá thất bại',
                    description: error?.response?.data?.msg,
                })
            }
        })
    }

    const handleCancel = () => {
        form.resetFields()
        onClose()
    }

    return (
        <Modal
            open={visible}
            onCancel={handleCancel}
            onOk={handleOk}
            title="Đánh giá dịch vụ"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Rating"
                    name="rating"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Rate allowHalf />
                </Form.Item>
                <Form.Item
                    label="Comment"
                    name="comment"
                    rules={[{ required: true, message: 'Không được để trống' }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default VoteModal
