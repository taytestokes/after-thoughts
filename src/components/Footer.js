import React from 'react'
import { FiGithub, FiTwitter, FiLinkedin, FiCoffee } from 'react-icons/fi'

export const Footer = () => {
  const githubLink = 'https://github.com/taytestokes'
  const twitterLink = 'https://twitter.com/taytestokes'
  const linkedinLink = 'https://linkedin.com/taytestokes'
  const kofiLink = 'https://ko-fi.com/taytestokes'

  return (
    <div className="container mt-auto mx-auto py-8 px-4 flex items-center justify-center text-gray-400 dark:text-gray-700">
      <ul className="flex items-center">
        <li className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <a href={kofiLink} rel="noopener noreferrer" target="_blank">
            <FiCoffee />
          </a>
        </li>

        <li className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <a href={linkedinLink} rel="noopener noreferrer" target="_blank">
            <FiLinkedin />
          </a>
        </li>

        <li className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <a href={twitterLink} rel="noopener noreferrer" target="_blank">
            <FiTwitter />
          </a>
        </li>

        <li className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <a href={githubLink} rel="noopener noreferrer" target="_blank">
            <FiGithub />
          </a>
        </li>
      </ul>
    </div>
  )
}
