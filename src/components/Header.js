import React from 'react'

import { LogoIcon } from './LogoIcon'
import { MobileNavigation } from './MobileNavigation'
import { DesktopNavigation } from './DesktopNavigation'

export const Header = () => {
  return (
    <header className="relative w-full flex items-center justify-between p-8">
      <div className="px-4">
        <LogoIcon />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
      {/* Desktop Navigation */}
      <DesktopNavigation />
    </header>
  )
}
