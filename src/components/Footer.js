import React from 'react'
import { BsGithub, BsTwitter } from 'react-icons/bs'

export const Footer = () => {
  return (
    <div className="container flex items-center justify-between py-8 px-4 mx-auto text-gray-400 text-sm">
      <span>&copy; 2022 Taytestokes.io</span>

      <ul className="flex items-center divide-x divide-gray-400 divide-opacity-50">
        <li className="hover:text-white pr-4">
          <a href="https://twitter.com/taytestokes">
            <BsTwitter size={20} />
          </a>
        </li>
        <li className="hover:text-white pl-4">
          <a href="https://github.com/taytestokes">
            <BsGithub size={20} />
          </a>
        </li>
      </ul>
    </div>
  )
}
