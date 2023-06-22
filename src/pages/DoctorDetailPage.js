import { Button, Col, Image, Row, Spin } from 'antd'
import React, { useEffect } from 'react'
import DoctorAppointment from '../components/Doctor/DoctorAppointment/DoctorAppointment'
import DoctorItem from '../components/Doctor/DoctorItem/DoctorItem'
import { useParams } from 'react-router-dom'
import PrescriptionBuy from '../components/Prescription/PrescriptionBuy/PrescriptionBuy'
import { getMediaByBusinessId, getPatientPres } from '../api/api'
import { useState } from 'react'

const DoctorDetailPage = () => {
    const { id } = useParams()
    const typeBusiness = sessionStorage.getItem('typeBusiness')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [presState, setPresState] = useState()
    const [img, setImg] = useState("")
    useEffect(async () => {
        const res = await getPatientPres(userInfo?.user_role_id)
        setPresState(res?.[0])
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
            </Row>
        </div>
    )
}

export default DoctorDetailPage
