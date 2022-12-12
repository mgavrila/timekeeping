import React, { useState } from 'react'
import { Menu, Layout } from 'antd'
import {
  FieldTimeOutlined,
  DashboardOutlined,
  FileTextOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'

import { useAppSelector } from '../../hooks/useRedux'
import { getAuth } from '../../store/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

const MENU_ITEMS = [
  {
    key: '/',
    icon: DashboardOutlined,
    label: 'Dashboard',
  },
  {
    key: '/timesheet',
    icon: FieldTimeOutlined,
    label: 'TimeSheet',
  },
  {
    key: '/projects',
    icon: FileTextOutlined,
    label: 'Projects',
  },
]

const items: MenuProps['items'] = MENU_ITEMS.map((item) => {
  return {
    key: item.key,
    icon: React.createElement(item.icon),
    label: item.label,
  }
})

const Sidebar: React.FC = () => {
  const auth = useAppSelector(getAuth)
  const navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false)

  if (!auth) {
    return null
  }

  const handleClick: MenuProps['onClick'] = (props) => {
    console.log(props)
    navigate(props.key)
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ height: '100%', borderRight: 0 }}
        items={items}
        theme="dark"
        onClick={handleClick}
      />
    </Sider>
  )
}

export default Sidebar
