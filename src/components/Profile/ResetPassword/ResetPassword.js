import { Button, Form, Input } from 'antd';
import React from 'react'
import { resetPassword } from '../../../api/api';
import { useHistory, useParams } from 'react-router-dom';
import { Notification } from '../../Notification/Notification';
import { NOTIFICATION_TYPE } from '../../../constants/common';

const ResetPassword = () => {
    const params = useParams();
    const history = useHistory();
    const localToken = localStorage.getItem('new-token');
    if (params.token !== localToken) {
        Notification({
            type: NOTIFICATION_TYPE.ERROR,
            message: 'Token không hợp lệ hoặc hết hạn',
            description: null,
        })
        history.push('/forgot-password')
    }
    const onFinish = async (values) => {
        const data = {
            ...values,
            userId: Number(params.userId),
        }
        console.log('Success:', data);
        await resetPassword(data)
            .then(() => {
                Notification({
                    type: NOTIFICATION_TYPE.SUCCESS,
                    message: 'Reset Password thành công',
                    description: null,
                })
                history.push('/login')
            })
            .catch(err => console.log(err))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
            className='w-50 mx-auto my-4 bg-light py-3 px-2 rounded'
            size='large'
        >
            <Form.Item
                label="Nhập mật khẩu mới"
                name="new_pass"
                rules={[
                    {
                        required: true,
                        message: 'Xin mời nhập mật khẩu mới',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Nhập lại mật khẩu mới"
                name="confirm_pass"
                rules={[
                    {
                        required: true,
                        message: 'Xin mời nhập lại mật khẩu mới',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
            >
                <Button type="primary" htmlType="submit" className='w-100'>
                    Reset Password
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ResetPassword