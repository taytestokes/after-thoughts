import React from 'react'
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useTheme } from '../hooks/useTheme'
import { MobileNavigation } from './MobileNavigation'

export const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const isDarkTheme = theme === 'dark'

  return (
    <React.Fragment>
      <div className="h-2 bg-gray-100 dark:bg-gray-900" />

      <header className="relative container mx-auto py-8 flex items-center">
        {/* Mobile Navigation */}
        <MobileNavigation />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <Link href="/">
            <a
              className={`px-4 py-3 leading-none ${
                router.pathname === '/'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400'
              }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
            >
              Home
            </a>
          </Link>
          <Link href="/blog">
            <a
              className={`px-4 py-3 leading-none ${
                router.pathname.includes('/blog')
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400'
              }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
            >
              Blog
            </a>
          </Link>
          <Link href="/work-journal">
            <a
              className={`px-4 py-3 leading-none ${
                router.pathname === '/work-journal'
                  ? 'text-gray-900 dark:text-gray-100'
                  : 'text-gray-600 dark:text-gray-400'
              }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
            >
              Work Journal
            </a>
          </Link>
        </div>

        {/* Theme Switcher */}
        <button
          className="ml-auto px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </button>
      </header>
    </React.Fragment>
  )
}
