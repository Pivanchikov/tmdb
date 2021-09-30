import ReactDOM from 'react-dom'

import { App } from './App'
import { AppProvider } from './AppProvider'
import './i18n/i18n'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
)
