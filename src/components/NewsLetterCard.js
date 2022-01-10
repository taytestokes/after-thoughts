import React from 'react'

export const NewsLettersCard = () => {
  return (
    <div className="p-4 md:p-8 rounded-md bg-zinc-900 mt-auto">
      <p className="text-xl text-white font-bold">Subscribe to the newsletter!</p>
      <p className="text-zinc-200 mt-2">
        Sign up for the news letter to receive updates about new posts and other content that won't
        be posted!
      </p>

      <form className="relative mt-4">
        <input
          aria-label="Enter your email address to subscribe to the newsletter"
          autoComplete="email"
          className="w-full text-white border border-zinc-700 bg-zinc-800 py-3 px-2 rounded-md focus:outline-0"
          placeholder="email@example.com"
          type="email"
        />
        <button
          className="absolute top-1 bottom-1 right-1 flex items-center text-white font-bold bg-gradient-to-r from-blue-600 to-violet-600 px-4 rounded-md"
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          Subscribe
        </button>
      </form>
    </div>
  )
}
