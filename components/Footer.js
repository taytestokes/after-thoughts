import React from 'react'

import { NewsletterSubscriptionForm } from './NewsletterSubscriptionForm'

import { BsGithub, BsTwitter } from 'react-icons/bs'

export const Footer = () => {
  return (
    <footer className="flex flex-col items-center bg-zinc-900 py-16 border-t-4 border-zinc-700">
      <div className="container flex flex-col px-4">
        <div>
          <p className="text-xl text-zinc-50 font-bold">Subscribe to the newsletter!</p>
          <p className="text-zinc-400 mt-2 mb-4">
            Subscribe to the After Thoughts newsletter for updates around new posts and additional
            content.
          </p>
          <NewsletterSubscriptionForm />
        </div>

        <div className="text-sm flex items-center justify-between mt-16">
          <div className="w-2/3">
            <p className="text-zinc-700 font-bold">&copy; After Thoughts 2022</p>
            <p className="text-zinc-700 ">A software development blog by Tayte Stokes.</p>
          </div>

          <ul className="text-xl flex items-center divide-x divide-zinc-400 divide-opacity-50 text-zinc-700">
            <li className="pr-4">
              <a href="https://twitter.com/taytestokes" target="_blank" rel="noopener noreferrer">
                <BsTwitter />
              </a>
            </li>
            <li className="pl-4">
              <a href="https://github.com/taytestokes" target="_blank" rel="noopener noreferrer">
                <BsGithub />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
