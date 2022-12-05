import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import GlobalCSS from './global/global.css'
import { ThemeProvider } from 'styled-components'
import { themeConfig } from './configs/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <ThemeProvider theme={themeConfig}>
      <Provider store={store}>
        <App />
        <GlobalCSS />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
)
