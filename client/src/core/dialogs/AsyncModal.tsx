import React from 'react'
import { Modal } from 'antd'

type AsyncModalType = {
  children: React.ReactNode | React.ReactNode[]
  isVisible: boolean
  title?: string | null
  isLoading: boolean
  onOk: () => void
  onCancel: () => void
}

const AsyncModal: React.FC<AsyncModalType> = ({
  isVisible,
  children,
  title,
  isLoading,
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
    >
      {children}
    </Modal>
  )
}

export default AsyncModal
