import React, { FC, ReactElement } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import {customTheme} from './theme/customTheme'
import { CssBaseline } from '@mui/material'
import Dashboard from './pages/Dashboard/Dashboard'


const App: FC = (): ReactElement => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <Dashboard/>
    </ThemeProvider>
    
  )
}

export default App
