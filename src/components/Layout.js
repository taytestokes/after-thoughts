import React from 'react'

import { Header } from './Header'
import { Footer } from './Footer'

export const Layout = ({ children }) => {
  return (
    <div className="w-screen min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <Header />

      <div className="container flex flex-col flex-grow items-center mx-auto px-4">
        {typeof children === 'function' ? children() : children}
      </div>

      <Footer />
    </div>
  )
}
