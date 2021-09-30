import { ThemeProvider } from '@material-ui/core'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { Provider as StoreProvider } from 'react-redux'

import { initI18n } from './i18n/i18n'
import { moviesSlice } from './state'
import { theme } from './theme/theme'

type AppProviderProps = {
  children?: React.ReactNode
}

initI18n()

const rootReducer = combineReducers({ movies: moviesSlice.reducer })
export const store = configureStore({ reducer: rootReducer })

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>{children}</StoreProvider>
    </ThemeProvider>
  )
}
