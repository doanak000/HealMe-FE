import { Button, Col, Image, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import DoctorAppointment from '../components/Doctor/DoctorAppointment/DoctorAppointment'
import DoctorItem from '../components/Doctor/DoctorItem/DoctorItem'
import { useParams } from 'react-router-dom'
import PrescriptionBuy from '../components/Prescription/PrescriptionBuy/PrescriptionBuy'
import { getMediaByBusinessId, getPatientPres } from '../api/api'
import { getReviewByBusiness } from '../api/api'
import { useState } from 'react'
import { Rate, List } from 'antd'
import moment from 'moment'
import Title from 'antd/lib/typography/Title'

const BusinessReviews = ({ reviews }) => {
    console.log('reviews', reviews)
    return (
        <div style={{ maxHeight: '400px', overflow: 'scroll' }}>
            <List
                dataSource={reviews}
                renderItem={(item) => (
                    <List.Item>
                        <div>
                            <Rate value={item?.ratings} disabled />
                            <p></p>
                            <p>
                                <strong>Đánh giá</strong>: {item?.comment}
                            </p>
                            <p>
                                <strong>Bởi</strong>: {item?.username} -{' '}
                                <strong>Vào</strong>:{' '}
                                {moment(item.created_date).format('MM-DD-YYYY')}
                            </p>
                        </div>
                    </List.Item>
                )}
            />
        </div>
    )
}

const DoctorDetailPage = () => {
    const { id } = useParams()
    const typeBusiness = sessionStorage.getItem('typeBusiness')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [presState, setPresState] = useState()
    const [img, setImg] = useState("")
    const [reviews, setReviews] = useState([])
    useEffect(async () => {
        const res = await getPatientPres(userInfo?.user_role_id)
        setPresState(res?.[0])
        const resReviews = await getReviewByBusiness(id)
        setReviews(resReviews?.details)
    }, [])
    useEffect(async () => {
        await getMediaByBusinessId(id)
            .then(res => setImg(res[0][0].url))
            .catch(err => console.error(err))
    })
    return (
        <div>
            <Row gutter={24}>
                <Col lg={12} md={12} className="my-2">
                    <DoctorItem businessId={id} />
                </Col>
                <Col lg={12} md={12}>
                    {img ? <Image src={img} className='w-50 my-2' /> : <Spin />}
                </Col>
                {typeBusiness == 2 && (
                    <PrescriptionBuy prescription={presState} businessId={id} />
                )}
                <Col lg={24} md={24}>
                    <DoctorAppointment businessId={id} className="my-2" />
                </Col>
                <Col lg={24} md={24}>
                    <Title className="fs-3">Đánh giá từ khách hàng</Title>
                    <BusinessReviews reviews={reviews} />
                </Col>
            </Row>
        </div>
    )
}

export default DoctorDetailPage
