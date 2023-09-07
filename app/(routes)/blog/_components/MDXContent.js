import React from 'react'

// Code highlight styles
import 'highlight.js/styles/github-dark.css'

export function MDXContent({ content }) {
  return (
    <section className="w-1/2 flex flex-col flex-1 break-words prose prose-invert prose-pre:p-0 prose-img:rounded-md prose-img:border-4 prose-img:border-zinc-600">
      {content}
    </section>
  )
}
