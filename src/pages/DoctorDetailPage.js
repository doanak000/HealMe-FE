import { Button, Col, Row } from 'antd'
import React from 'react'
import DoctorAppointment from '../components/Doctor/DoctorAppointment/DoctorAppointment'
import DoctorItem from '../components/Doctor/DoctorItem/DoctorItem'
import { useParams } from 'react-router-dom'
import PrescriptionBuy from '../components/Prescription/PrescriptionBuy/PrescriptionBuy'
const res = [
    [
        {
            pres_id: 1,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-05T20:36:25.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: null,
        },
        {
            pres_id: 2,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-06T19:19:49.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: null,
        },
        {
            pres_id: 3,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-13T23:06:57.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: null,
        },
        {
            pres_id: 4,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-14T03:13:50.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Không biết',
        },
        {
            pres_id: 5,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-15T20:17:44.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: null,
        },
        {
            pres_id: 6,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-15T20:19:50.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Bệnh khùng',
        },
        {
            pres_id: 7,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-15T20:26:53.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Bệnh khùng',
        },
        {
            pres_id: 8,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-15T20:38:45.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Bệnh khùng',
        },
        {
            pres_id: 10,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-16T16:35:56.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Bệnh khùng',
        },
        {
            pres_id: 13,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-16T21:43:41.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Không biết',
        },
        {
            pres_id: 14,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-17T20:07:30.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Chắc là viêm họng',
        },
        {
            pres_id: 15,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-04-17T20:23:31.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: 'Bệnh khùng',
        },
        {
            pres_id: 17,
            business_name: 'Nhà thuốc Phương Chính Sài Gòn',
            created_date: '2023-05-12T09:57:07.000Z',
            fullname: 'Thái Sơn',
            fulladdress:
                '55A, Trần Ngọc Diện, Phường Thảo Điền, Thành phố Thủ Đức, Thành phố Hồ Chí Minh',
            email: 'lenamthaisonts@gmail.com',
            phone: null,
            diagnosis: null,
        },
    ],
    {
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '',
        protocol41: true,
        changedRows: 0,
    },
]
const DoctorDetailPage = () => {
    const { id } = useParams()
    const typeBusiness = sessionStorage.getItem('typeBusiness')
    return (
        <div>
            <Row gutter={24}>
                <Col lg={24} md={24} className="my-2">
                    <DoctorItem businessId={id} />
                </Col>
                {typeBusiness == 2 && (
                    <PrescriptionBuy prescription={res?.[0]} />
                )}
                <Col lg={24} md={24}>
                    <DoctorAppointment businessId={id} className="my-2" />
                </Col>
            </Row>
        </div>
    )
}

export default DoctorDetailPage
