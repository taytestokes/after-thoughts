import React from 'react'

export const ThemeContext = React.createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')
  const oppositeTheme = theme === 'light' ? 'dark' : 'light'

  const toggleTheme = () => {
    setTheme(oppositeTheme)
  }

  React.useEffect(() => {
    const htmlElement = document.querySelector('html')

    htmlElement.classList.add(theme)

    if (htmlElement.classList.contains(oppositeTheme)) {
      htmlElement.classList.remove(oppositeTheme)
    }
  }, [theme])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
