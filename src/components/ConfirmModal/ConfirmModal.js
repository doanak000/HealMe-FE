import React from 'react'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

export const confirm = (props) => {
  Modal.confirm({
    title: 'Xác nhận',
    icon: <ExclamationCircleOutlined />,
    ...props
  })
}
