import { Button, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/styles/component/DoctorItem/DoctorItem.css'
import { getAddressDetail, getClinicInfoApi, getMap } from '../../../api/api'
import { FiPhoneCall } from 'react-icons/fi'
import { AiFillMail } from 'react-icons/ai'

const DoctorItem = (props) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const { item, businessId } = props
    const [clinicInfo, setClinicInfo] = useState(null)
    const [address, setAddress] = useState('')
    const [distance, setDistance] = useState(0)

    useEffect(async () => {
        const result = await getClinicInfoApi(businessId || item?.id)
        setClinicInfo(result[0][0])
        await getAddressDetail(item.address_id).then((res) =>
            setAddress(res[0][0].fulladdress)
        )
    }, [])

    // useEffect(async () => {
    //   if (!userInfo) return;
    //   if (address) {
    //     await getMap({
    //       destinations: [address]
    //     })
    //       .then(res => setDistance(res?.distance?.kilometers.toFixed(2)))
    //   }
    // }, [address])

    return (
        <div className="row my-2 doctor-item-container p-2 mb-2 bg-body rounded bg-body rounded g-2">
            {/* <div className="col-3">
        <Image
          src="https://www.fvhospital.com/wp-content/uploads/2018/03/dr-vo-trieu-dat-2020.jpg"
          className="rounded"
        />
      </div> */}

            <div className="col-12 text-justify">
                <h4 className="text-justify doctor-name">
                    <Link
                        to={`/doctor/${item?.id}`}
                        style={{ textDecoration: 'none', color: '#016bb0' }}
                    >
                        {clinicInfo?.business_name}
                    </Link>
                </h4>
                <p className="text-justify">
                    <b>Địa chỉ:</b>{' '}
                    <a
                        href={`http://maps.google.com/?q=${clinicInfo?.fulladdress}`}
                        target="_blank"
                        style={{ color: '#1990ff' }}
                    >
                        {clinicInfo?.fulladdress}
                    </a>
                </p>
                <p className="text-justify">
                    <b>Mô tả:</b> {clinicInfo?.descr}
                </p>
                {userInfo && (
                    <p className="text-justify">
                        <b>Khoảng cách:</b>{' '}
                        {distance === 0 ? <Spin /> : distance} km
                    </p>
                )}
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6">
                        <Button className="w-100 text-white fw-bold btn-mail">
                            <AiFillMail className="fs-5 me-2" />
                            <a
                                className="text-decoration-none btn-text"
                                href={`mailto:${clinicInfo?.email}`}
                            >
                                {clinicInfo?.email || 'No Email'}
                            </a>
                        </Button>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6">
                        <Button className="w-100 text-white fw-bold btn-phone">
                            <FiPhoneCall className="fs-5 me-2" />
                            <a
                                className="text-decoration-none text-white "
                                href={`tel:${clinicInfo?.phone}`}
                            >
                                {clinicInfo?.phone || 'No Phone'}
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorItem
