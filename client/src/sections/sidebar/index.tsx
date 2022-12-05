import React, { useState } from 'react'
import { Menu, Layout } from 'antd'
import { FieldTimeOutlined, DashboardOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { useAppSelector } from '../../hooks/useRedux'
import { getAuth } from '../../store/auth/authSlice'
const { Sider } = Layout

const MENU_ITEMS = [
  {
    icon: DashboardOutlined,
    label: 'Dashboard',
  },
  {
    icon: FieldTimeOutlined,
    label: 'TimeSheet',
  },
]

const items: MenuProps['items'] = MENU_ITEMS.map((item) => {
  return {
    key: item.label,
    icon: React.createElement(item.icon),
    label: item.label,
  }
})

const Sidebar: React.FC = () => {
  const auth = useAppSelector(getAuth)

  const [collapsed, setCollapsed] = useState(false)

  if (!auth) {
    return null
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
      />
    </Sider>
  )
}

export default Sidebar
