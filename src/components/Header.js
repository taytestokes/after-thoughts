import React from 'react'
import { FiSun, FiMoon } from 'react-icons/fi'

import { useTheme } from '../hooks/useTheme'
import { MobileNavigation } from './MobileNavigation'
import { DesktopNavigation } from './DesktopNavigation'

export const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <header className="relative p-8 flex items-center">
      <MobileNavigation />
      <DesktopNavigation />
      <button
        className="ml-auto px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
        onClick={toggleTheme}
      >
        {isDarkTheme ? <FiSun /> : <FiMoon />}
      </button>
    </header>
  )
}
