import React from 'react'

import { LogoIcon } from './LogoIcon'

export const Footer = () => {
  return (
    <div className="flex items-center justify-between p-8">
      <div className="flex items-center">
        <LogoIcon size={16} />
        <p className="ml-1">taytestokes.io</p>
      </div>

      <div></div>
    </div>
  )
}
