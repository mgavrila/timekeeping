import { DefaultTheme } from 'styled-components'

export interface ThemeConfig extends DefaultTheme {
  dark: {
    button: string
    content: string
    header: string
    text: string
  }
}

export const themeConfig: ThemeConfig = {
  dark: {
    header: '#0F3460',
    button: '#533483',
    content: '#16213E',
    text: '#ffff',
  },
}
