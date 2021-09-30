import { createTheme } from '@material-ui/core'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#113b5d',
      main: '#032541',
    },
    secondary: {
      main: '#fff',
      dark: '#CCC',
    },
  },
  overrides: {
    MuiSelect: {
      select: {
        '&:focus': {
          backgroundColor: '#fff',
        },
      },
    },
    MuiSwitch: {
      track: {
        '$checked$checked + &': {
          opacity: 0.38,
          backgroundColor: '#032541',
        },
      },
    },
  },
})

export const secondaryMain = 'white'
export const secondaryDark = '#CCC'
export const primaryMain = '#032541'
export const primaryLight = '#113b5d'
export const primaryLightHover = '#3d5b74'
export const primarySelect = 'rgba(0, 0, 0, 0.08)'
export const primary25Select = 'rgba(0, 0, 0, 0.04)'
