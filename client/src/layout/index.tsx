import React from 'react'
import { ConfigProvider, Layout } from 'antd'
import AppHeader from './header'
import AppFooter from './footer'
import AppContent from './content'

const AppLayout: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'red',
        // colorBgBase: "#00b96b",
        // colorBgContainer: "white",
        colorBgLayout: '#404258',
      },
    }}
  >
    <Layout style={{ height: '100vh' }}>
      <AppHeader />
      <AppContent />
    </Layout>
  </ConfigProvider>
)

export default AppLayout
