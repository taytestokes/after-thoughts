import React from 'react'

import Link from 'next/link'

import { LogoIcon } from './icons/LogoIcon'
import { MobileNavigation } from './MobileNavigation'
import { DesktopNavigation } from './DesktopNavigation'

export const Header = () => {
  return (
    <header className="relative w-full flex items-center justify-between p-8">
      <Link href="/">
        <a className="px-4">
          <LogoIcon />
        </a>
      </Link>

      {/* Mobile Navigation */}
      <MobileNavigation />
      {/* Desktop Navigation */}
      <DesktopNavigation />
    </header>
  )
}
