import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import AppHeader from './header'
import AppContent from './content'
import Sidebar from '../sections/sidebar'
import { useTheme } from 'styled-components'
import { ThemeConfig } from '../configs/theme'

const AppLayout: React.FC = () => {
  const theme = useTheme() as ThemeConfig

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.dark.button,
          colorBgLayout: theme.dark.content,
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <Layout>
          <Sidebar />

          <AppContent />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default AppLayout
