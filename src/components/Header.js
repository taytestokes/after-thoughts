import React from 'react'
import { FiSun, FiMoon, FiArrowLeft } from 'react-icons/fi'

import { useTheme } from '../hooks/useTheme'

import Link from 'next/link'
import { useRouter } from 'next/router'

export const Header = () => {
  const { pathname } = useRouter()
  const { theme, toggleTheme } = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <React.Fragment>
      <div className="h-2 bg-gray-100 bg-gradient-to-r dark:from-violet-500  dark:to-pink-500" />

      <header className="container mx-auto py-8 px-2 flex items-center">
        {pathname.includes('blog') ? (
          <Link href="/">
            <a className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <FiArrowLeft />
            </a>
          </Link>
        ) : null}
        <button
          className="ml-auto p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </button>
      </header>
    </React.Fragment>
  )
}
