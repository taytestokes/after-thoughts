import React from 'react'

import { BsGithub, BsTwitter } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-between py-8 text-sm">
      <div className="w-1/2 flex flex-col flex-wrap text-xs ">
        <span className="font-extrabold text-zinc-900">&copy; After Thoughts 2022</span>
        <span className="text-zinc-700">A software development blog by Tayte Stokes</span>
      </div>

      <ul className="flex items-center divide-x divide-zinc-400 divide-opacity-50 text-zinc-700">
        <li className="hover:text-zinc-900 pr-4">
          <a href="https://twitter.com/taytestokes" target="_blank" rel="noopener noreferrer">
            <BsTwitter size={20} />
          </a>
        </li>
        <li className="hover:text-zinc-900 pl-4">
          <a href="https://github.com/taytestokes" target="_blank" rel="noopener noreferrer">
            <BsGithub size={20} />
          </a>
        </li>
      </ul>
    </footer>
  )
}
