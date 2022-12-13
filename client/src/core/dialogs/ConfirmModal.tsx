import { ExclamationCircleOutlined } from '@ant-design/icons'
import { Modal } from 'antd'

type ConfirmModalType = {
  // isVisible: boolean
  onOk: () => void
  // onCancel: () => void
}

export const confirm = ({ onOk }: ConfirmModalType) => {
  Modal.confirm({
    title: 'Are you sure?',
    icon: <ExclamationCircleOutlined />,
    content: 'This operation cannot be undone. Would you like to proceed?',
    okText: 'Yes',
    cancelText: 'No',
    centered: true,
    okButtonProps: { danger: true },
    onOk,
  })
}
