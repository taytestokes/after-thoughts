import React from 'react'
import { FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { useTheme } from '../hooks/useTheme'

import { Footer } from './Footer'

export const Layout = ({ children }) => {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const isDarkTheme = theme === 'dark'

  const [showMobileNavigation, setShowMobileNavigation] = React.useState(false)

  return (
    <div className="w-screen min-h-screen flex flex-col dark:bg-black dark:text-white">
      {/* Top Border */}
      <div className="h-2 bg-gray-100 dark:bg-gray-900" />

      <header className="relative container mx-auto py-8 flex items-center">
        {/* Desktop Naviation */}
        <div className="hidden md:flex items-center md:">
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

        {/* Mobile Nav Item */}
        <div className="md:hidden flex items-center">
          <button
            className="ml-auto px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
            onClick={() => setShowMobileNavigation(!showMobileNavigation)}
          >
            <FiMenu />
          </button>
        </div>

        {/* Theme Switcher */}
        <button
          className="ml-auto px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={toggleTheme}
        >
          {isDarkTheme ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      {/* Page Content Container */}
      <div className="relative container flex flex-col flex-grow items-center mx-auto px-4">
        {/* Mobile Nav Menu */}
        {showMobileNavigation ? (
          <div className="absolute top-0 w-full h-full px-4 pb-4 flex flex-col items-center bg-white dark:bg-black">
            <Link href="/">
              <a
                className={`w-full flex flex-col items-center p-4 leading-none ${
                  router.pathname === '/'
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
              >
                Home
              </a>
            </Link>
            <Link href="/blog">
              <a
                className={`w-full flex flex-col items-center p-4 leading-none ${
                  router.pathname.includes('/blog')
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
              >
                Blog
              </a>
            </Link>
            <Link href="/work-journal">
              <a
                className={`w-full flex flex-col items-center p-4 leading-none ${
                  router.pathname === '/work-journal'
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }  rounded-md hover:bg-gray-100 dark:hover:bg-gray-900`}
              >
                Work Journal
              </a>
            </Link>
          </div>
        ) : null}

        {/* Page Content */}
        {typeof children === 'function' ? children() : children}
      </div>

      <Footer />
    </div>
  )
}
