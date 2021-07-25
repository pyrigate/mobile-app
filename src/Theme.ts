import merge from 'deepmerge'
import { DarkTheme as PaperDarkTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme } from '@react-navigation/native'

const themeOverrides = {
  dark: true,
  mode: 'adaptive',
  colors: {
    background: '#474747',
    surface: '#b695c0',
    backdrop: '#787878',
    disabled: '#ff0000',
    card: '#7f6886',
  },
}

export const DarkTheme = merge(merge(PaperDarkTheme, NavigationDarkTheme), themeOverrides)
