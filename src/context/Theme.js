import React from 'react'

export const ThemeContext = React.createContext(null)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = React.useState('light')
  const oppositeTheme = theme === 'light' ? 'dark' : 'light'

  const toggleTheme = () => {
    setTheme(oppositeTheme)
  }

  /**
   * Adds background styles to the body element of
   * the application.
   *
   * TODO: Find a better tailwind/next configuration for this
   */
  React.useEffect(() => {
    const bodyElement = document.querySelector('body')
    bodyElement.classList.add('dark:bg-black')
  }, [])

  /**
   * Toggles the dark mode class on the html element of
   * the application
   */
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
