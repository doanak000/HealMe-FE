import { LoadingOutlined } from '@ant-design/icons';
import { Form, Input, Button, Spin, Row, Col } from 'antd'
import React, { useState } from 'react'
import { forgotPassword } from '../../../api/api';
import { Notification } from '../../Notification/Notification';
import { NOTIFICATION_TYPE } from '../../../constants/common';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log('Success:', values);
        setIsLoading(true)
        await forgotPassword(values)
            .then((res) => {
                Notification({
                    type: NOTIFICATION_TYPE.SUCCESS,
                    message: 'Reset password link đã được gửi tới email của bạn',
                    description: null,
                })
                localStorage.setItem('new-token', res.token)
            })
            .catch(() => {
                Notification({
                    type: NOTIFICATION_TYPE.ERROR,
                    message: 'Không tìm thấy email trong hệ thống',
                    description: null,
                })
                form.resetFields();
                setIsLoading(false)
            });
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="container">
            <div className="row align-items-center justify-content-center
          min-vh-100">
                <div className="col-12 col-md-8 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="mb-4">
                                <h5>Quên mật khẩu?</h5>
                                <p className="mb-2">Nhập email đã đăng ký để reset lại mật khẩu
                                </p>
                            </div>
                            <Form
                                name="basic"
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                className='w-100 mx-auto'
                                layout='vertical'
                                size='large'
                                form={form}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Xin mời nhập email',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Nhập email của bạn' allowClear />
                                </Form.Item>
                                <Row gutter={8}>
                                    <Col xs={12}>
                                        <Form.Item>
                                            <Button className='w-100'>
                                                <Link className='text-decoration-none' to="/login">Đăng nhập</Link>
                                            </Button>
                                        </Form.Item>

                                    </Col>
                                    <Col xs={12}>
                                        <Form.Item>
                                            <Button className='w-100'>
                                                <Link className='text-decoration-none' to="/register">Đăng ký</Link>
                                            </Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Form.Item className='mx-auto'>
                                    <Button type="primary" htmlType="submit" className='w-100' size='large'>
                                        {isLoading ? <Spin indicator={<LoadingOutlined
                                            className='text-white' spin
                                        />} /> : <span>Reset Password</span>}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ForgotPassword