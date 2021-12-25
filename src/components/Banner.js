import React from 'react'

export const Banner = ({ children }) => {
  return (
    <div className="w-full flex flex-col py-8">
      <div className="w-full text-gray-600 py-4 px-2 border-l-4 border-gray-300 dark:border-gray-700 rounded-md bg-gray-100 dark:bg-gray-900">
        {children}
      </div>
    </div>
  )
}
