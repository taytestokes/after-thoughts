import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ThemeSwitcher } from './ThemeSwitcher'

export const DesktopNavigation = () => {
  const router = useRouter()

  return (
    <div className="hidden md:flex items-center ml-auto">
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

      <ThemeSwitcher />
    </div>
  )
}
