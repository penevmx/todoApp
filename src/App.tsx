import React, { FC, ReactElement } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import {customTheme} from './theme/customTheme'
import { CssBaseline } from '@mui/material'


const App: FC = (): ReactElement => {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline/>
      <h1>asd</h1>
    </ThemeProvider>
    
  )
}

export default App
