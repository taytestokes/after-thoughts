import React from 'react'
import Link from 'next/link'

import { BrainIcon } from './BrainIcon'

export const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <header className="container flex items-center mx-auto py-8 px-4">
        <Link href="/">
          <a>
            <BrainIcon size={45} />
          </a>
        </Link>
      </header>

      <main className="flex flex-col grow">
        {typeof children === 'function' ? children() : children}
      </main>
    </div>
  )
}
