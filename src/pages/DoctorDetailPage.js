import { Button, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import DoctorAppointment from '../components/Doctor/DoctorAppointment/DoctorAppointment'
import DoctorItem from '../components/Doctor/DoctorItem/DoctorItem'
import { useParams } from 'react-router-dom'
import PrescriptionBuy from '../components/Prescription/PrescriptionBuy/PrescriptionBuy'
import { getPatientPres } from '../api/api'
import { useState } from 'react'

const DoctorDetailPage = () => {
    const { id } = useParams()
    const typeBusiness = sessionStorage.getItem('typeBusiness')
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const [presState, setPresState] = useState()
    useEffect(async () => {
        const res = await getPatientPres(userInfo?.user_role_id)
        setPresState(res?.[0])
    }, [])
    return (
        <div>
            <Row gutter={24}>
                <Col lg={24} md={24} className="my-2">
                    <DoctorItem businessId={id} />
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
