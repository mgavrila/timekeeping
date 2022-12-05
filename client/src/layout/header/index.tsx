import React from 'react'
import { Layout, Typography } from 'antd'
import { useTheme } from 'styled-components'
import { ThemeConfig } from '../../configs/theme'

const { Header } = Layout

const AppHeader: React.FC = () => {
  const theme = useTheme() as ThemeConfig

  return (
    <Header
      style={{
        backgroundColor: theme.dark.header,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography style={{ color: theme.dark.text }}>TimeTrack</Typography>
    </Header>
  )
}

export default AppHeader
