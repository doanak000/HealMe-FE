import { Button, Form, Input } from 'antd'
import React from 'react'
import { changePassword } from '../../../api/api';
import { NOTIFICATION_TYPE } from '../../../constants/common';
import { Notification } from '../../Notification/Notification';

const ChangePassword = () => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        delete values.confirm_pass;
        try {
            await changePassword(userInfo?.id, values);
            Notification({
                type: NOTIFICATION_TYPE.SUCCESS,
                message: 'Thay đổi mật khẩu thành công',
                description: null,
            })
            form.resetFields();
        } catch (error) {
            Notification({
                type: NOTIFICATION_TYPE.ERROR,
                message: 'Mật khẩu cũ không đúng. Xin mời nhập lại',
                description: null,
            })
        }
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
            className='w-50 mx-auto'
            size='large'
            form={form}
        >
            <Form.Item
                label="Mật khẩu cũ"
                name="old_pass"
                rules={[
                    {
                        required: true,
                        message: 'Xin mời nhập lại mật khẩu cũ',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Mật khẩu mới"
                name="new_pass"
                rules={[
                    {
                        required: true,
                        message: 'Xin mời nhập mật khẩu mới',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Nhập lại mật khẩu"
                name="confirm_pass"
                rules={[
                    {
                        required: true,
                        message: 'Nhập lại mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('new_pass') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Mật khẩu mới không trùng khớp');
                        }
                    })
                ]}
                dependencies={['new_pass']}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Đổi mật khẩu
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ChangePassword