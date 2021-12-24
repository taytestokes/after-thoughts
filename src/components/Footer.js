import React from 'react'

import { LogoIcon } from './icons/LogoIcon'

export const Footer = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex items-center">
        <LogoIcon size={16} />
        <p className="ml-1">taytestokes.io</p>
      </div>
      <div>
        <p>&copy; 2022 Tayte Stokes</p>
      </div>
    </div>
  )
}
