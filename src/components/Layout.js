import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

import { useTheme } from '../hooks/useTheme'

export const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <div className="w-screen min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      {/* Gradient Top Border */}
      <div className="h-2 bg-gray-100 bg-gradient-to-r dark:from-violet-500  dark:to-pink-500" />
      {/* Header */}
      <header className="container mx-auto py-8 px-2 flex items-center justify-end">
        <button onClick={toggleTheme}>{isDarkTheme ? <FiSun /> : <FiMoon />}</button>
      </header>
      {typeof children === 'function' ? children() : children}
      <div className="container mt-auto mx-auto flex justify-center items-center border-t border-gray-700 p-8">
        <p className="text-gray-400">Made with questionable choices by Tayte Stokes</p>
      </div>
    </div>
  )
}
