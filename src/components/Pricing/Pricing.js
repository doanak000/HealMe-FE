import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'antd'

import '../../assets/styles/component/Pricing/Pricing.scss'

const realClientID =
    'Aejgfcu4m6dGmedJ8dmXBrZv4YNsExsQHYgcjiNLfCJUvqAH34vVMaH6rjc0683XlqEUOAOYj-qnAjyQ'

const monthPlanId = 'P-34H29037U6613691WMRPD7RQ'
const yearPlanId = 'P-5HF13890691102530MRS2TCQ'

const monthAPIurl =
    'https://healme.azurewebsites.net/subscription/create/monthly'
const yearAPIurl = 'https://healme.azurewebsites.net/subscription/create/yearly'

const PayPalButton = ({ planId, apiUrl }) => {
    useEffect(() => {
        const script = document.createElement('script')
        script.src = `https://www.paypal.com/sdk/js?client-id=${realClientID}&vault=true&intent=subscription&locale=vi_VN`
        script.setAttribute('data-sdk-integration-source', 'button-factory')
        script.async = true

        script.onload = () => {
            window.paypal
                .Buttons({
                    style: {
                        shape: 'pill',
                        color: 'blue',
                        layout: 'vertical',
                        label: 'subscribe',
                    },
                    createSubscription: function (data, actions) {
                        return actions.subscription.create({
                            plan_id: planId,
                        })
                    },
                    onApprove: function (data, actions) {
                        const subscriptionId = data.subscriptionID
                        const userInfo = JSON.parse(
                            localStorage.getItem('userInfo')
                        )
                        const businessId = userInfo.user_role_id
                        const requestData = {
                            biz_id: businessId,
                            plan_id: 2,
                            payment_id: subscriptionId,
                        }

                        fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(requestData),
                        })
                            .then((response) => response.json())
                            .then((subsResult) => {
                                if (subsResult) {
                                    Modal.success({
                                        title: 'Nâng cấp tài khoản thành công',
                                        content:
                                            'Với gói Premium, bạn sẽ trải nghiệm tất cả các tính năng tuyệt vời mà chúng tôi cung cấp. Điều này sẽ mang đến cho bạn sự tiện lợi và khả năng giúp đỡ nhiều bệnh nhân hơn. Hãy sẵn sàng khám phá và tận hưởng những trải nghiệm tuyệt vời trong việc cung cấp chăm sóc y tế chất lượng cao.',
                                        centered: true,
                                        okText: 'Đóng',
                                        onOk: () => {
                                            // Redirect to the home page
                                            window.location.href = '/home'
                                        },
                                    })
                                } else {
                                    alert('Đã có lỗi trong quá trình xử lí')
                                }
                            })
                            .catch((err) => {
                                console.error('Lỗi đăng kí subscription:', err)
                            })
                    },
                })
                .render(`#paypal-button-container-${planId}`)
        }

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [planId])

    return <div id={`paypal-button-container-${planId}`}></div>
}

const Pricing = () => {
    const [isYearly, setIsYearly] = useState(true)

    const togglePlan = () => {
        setIsYearly(!isYearly)
    }

    const pricingOptions = isYearly
        ? {
              planId: yearPlanId,
              apiUrl: yearAPIurl,
              price: '244,000',
              frequency: 'năm',
              options: [
                  'Bao gồm tất cả quyền lợi của gói "Miễn phí" kèm thêm',
                  'Hệ thống quản lý tủ thuốc',
                  'Hệ thống quản lý giấy tờ',
                  'Hệ thống nhắc nhở và thông báo tự động',
                  'Dùng thử 7 ngày MIỄN PHÍ',
              ],
          }
        : {
              planId: monthPlanId,
              apiUrl: monthAPIurl,
              price: '24,400',
              frequency: 'tháng',
              options: [
                  'Bao gồm tất cả quyền lợi của gói "Miễn phí" kèm thêm',
                  'Hệ thống quản lý tủ thuốc',
                  'Hệ thống quản lý giấy tờ',
                  'Hệ thống nhắc nhở và thông báo tự động',
              ],
          }

    return (
        <div className="pricingTable">
            <ul className="pricingTable-firstTable">
                <li className="pricingTable-firstTable_table">
                    <h1 className="pricingTable-firstTable_table__header">
                        Miễn phí
                    </h1>
                    <p className="pricingTable-firstTable_table__pricing">
                        <span></span>
                        <span>0</span>
                        <span>đ/tháng</span>
                    </p>
                    <ul className="pricingTable-firstTable_table__options">
                        <li>Hiển thị trên website HealMe</li>
                        <li>Đặt & hẹn lịch với bệnh nhân</li>
                        <li>Khám bệnh online</li>
                        <li>Kê đơn thuốc online</li>
                    </ul>

                    <a href="/">
                        <button
                            className="pricingTable-firstTable_table__getstart"
                            disabled
                        >
                            Gói mặc định
                        </button>
                    </a>
                </li>
                <li className="pricingTable-firstTable_table">
                    <h1 className="pricingTable-firstTable_table__header">
                        {isYearly ? 'Premium' : 'Premium'}
                    </h1>
                    <div className="toggleButton">
                        <Button
                            type={isYearly ? 'primary' : 'default'}
                            onClick={togglePlan}
                            className="buttonYear"
                        >
                            Năm
                        </Button>
                        <Button
                            type={!isYearly ? 'primary' : 'default'}
                            onClick={togglePlan}
                            className="buttonMonth"
                        >
                            Tháng
                        </Button>
                    </div>
                    <p className="pricingTable-firstTable_table__pricing">
                        <span></span>
                        <span>{pricingOptions.price}</span>
                        <span>đ/{pricingOptions.frequency}</span>
                    </p>
                    <ul className="pricingTable-firstTable_table__options mb-4">
                        {pricingOptions.options.map((option, index) => (
                            <li key={index}>{option}</li>
                        ))}
                    </ul>
                    <PayPalButton
                        planId={pricingOptions.planId}
                        apiUrl={pricingOptions.apiUrl}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Pricing
