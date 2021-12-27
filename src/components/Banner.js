import React from 'react'

export const Banner = ({ children }) => {
  return (
    <div className="w-full flex flex-col py-8">
      <div className="w-full py-4 px-2 border-l-4 border-gray-700 rounded-md bg-gray-900">
        {children}
      </div>
    </div>
  )
}
