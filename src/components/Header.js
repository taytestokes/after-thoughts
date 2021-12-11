import React from 'react'
import { useRouter } from 'next/router'
import { FiSun, FiMoon } from 'react-icons/fi'

import { useTheme } from '../hooks/useTheme'

import Link from 'next/link'

export const Header = () => {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <React.Fragment>
      <div className="h-2 bg-gray-100 dark:bg-gray-900" />

      <header className="container mx-auto py-8 px-2 flex items-center">
        <Link href="/">
          <a
            className={`p-3 leading-none ${
              router.pathname === '/'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-500 dark:text-gray-400'
            }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
          >
            Home
          </a>
        </Link>
        <Link href="/blog">
          <a
            className={`p-3 leading-none ${
              router.pathname.includes('/blog')
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
            }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
          >
            Blog
          </a>
        </Link>
        <Link href="/work-journal">
          <a
            className={`p-3 leading-none ${
              router.pathname === '/work-journal'
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-600 dark:text-gray-400'
            }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
          >
            Work Journal
          </a>
        </Link>
        <button
          className="ml-auto p-3 rounded-md text-gray-900 dark:text-white fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </button>
      </header>
    </React.Fragment>
  )
}
