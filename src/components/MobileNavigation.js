import React from 'react'
import { FiMenu } from 'react-icons/fi'
import Link from 'next/link'
import { useRouter } from 'next/router'

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
    <>
      <div className="md:hidden flex items-center">
        <button
          className="ml-auto px-4 py-3 rounded-md text-gray-600 dark:text-gray-400 fill-current hover:bg-gray-100 dark:hover:bg-gray-900"
          onClick={toggleNavMenu}
        >
          <FiMenu />
        </button>
      </div>

      {showMobileNavigation ? (
        <div className="md:hidden absolute top-full w-full h-screen px-4 pb-4 flex flex-col flex-grow items-center bg-white dark:bg-black space-y-2">
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
    </>
  )
}
