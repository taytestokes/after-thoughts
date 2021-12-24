import React from 'react'
import { FiMenu, FiX } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LogoIcon } from './icons/LogoIcon'
import { ThemeSwitcher } from './ThemeSwitcher'

export const MobileNavigation = () => {
  const router = useRouter()
  const [showMobileNavigation, setShowMobileNavigation] = React.useState(false)

  const toggleNavMenu = () => {
    if (showMobileNavigation) {
      setShowMobileNavigation(false)
      document.body.style.overflow = ''
    } else {
      setShowMobileNavigation(true)
      document.body.style.overflow = 'hidden'
    }
  }

  // Clean up the overflow upon unmounting
  React.useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div>
      <div className="md:hidden ml-auto">
        <button
          className="px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={toggleNavMenu}
        >
          <FiMenu />
        </button>
      </div>

      {showMobileNavigation ? (
        <div className="z-10 fixed top-0 left-0 right-0 bottom-0 flex flex-col flex-grow bg-white dark:bg-black">
          <div className="h-2 bg-gray-100 dark:bg-gray-900" />

          <div className="flex items-center py-8 px-2">
            <div className="px-4">
              <LogoIcon />
            </div>

            <button
              className="text-gray-600 dark:text-gray-400 fill-current px-4 py-3 ml-auto hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md"
              onClick={toggleNavMenu}
            >
              <FiX />
            </button>
          </div>

          <div className="w-full flex flex-col items-center px-8">
            <Link href="/">
              <a
                className={`w-full flex flex-col items-center p-4 rounded-md  ${
                  router.pathname === '/'
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Home
              </a>
            </Link>
            <Link href="/blog">
              <a
                className={`w-full flex flex-col items-center p-4 rounded-md  ${
                  router.pathname.includes('/blog')
                    ? 'text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Blog
              </a>
            </Link>
          </div>

          <div className="flex items-center p-8 mt-auto">
            <ThemeSwitcher />
          </div>
        </div>
      ) : null}
    </div>
  )
}
