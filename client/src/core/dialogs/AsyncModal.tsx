import React from 'react'
import { Modal } from 'antd'

type AsyncModalType = {
  children: React.ReactNode | React.ReactNode[]
  isVisible: boolean
  title?: string | null
  isLoading: boolean
  okText?: string
  onOk: () => void
  onCancel: () => void
}

const AsyncModal: React.FC<AsyncModalType> = ({
  isVisible,
  children,
  title,
  isLoading,
  okText = 'Ok',
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      title={title}
      open={isVisible}
      onOk={onOk}
      confirmLoading={isLoading}
      onCancel={onCancel}
      centered
      maskClosable={false}
      okText={okText}
    >
      {children}
    </Modal>
  )
}

export default AsyncModal
