import React from 'react'
import Link from 'next/link'

import { LogoIcon } from './icons/LogoIcon'

export const Footer = () => {
  return (
    <div className="container flex items-center justify-center py-8 px-4 mx-auto">
      <span className="flex items-center text-sm ">
        <LogoIcon size={20} />
        taytestokes.io
      </span>
    </div>
  )
}
