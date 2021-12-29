import React from 'react'

import { BiSearch } from 'react-icons/bi'

export const SearchBar = () => {
  return (
    <div className="relative w-full">
      <BiSearch className="absolute left-2 top-3 h-5 w-5 pointer-events-none text-gray-400" />
      <input
        className="w-full block px-4 py-2 pl-8 border border-gray-700 bg-gray-900 text-gray-400 rounded-md"
        id="search"
        placeholder="Search posts"
      />
    </div>
  )
}
