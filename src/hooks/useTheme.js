import React from 'react'

import { ThemeContext } from '../context/Theme'

export const useTheme = () => {
  const themeContext = React.useContext(ThemeContext)

  return themeContext
}
