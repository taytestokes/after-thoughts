import React from 'react'

/**
 * Highlight styles from highlight.js for styling
 * the code snippits in the MDX content.
 */
import 'highlight.js/styles/github-dark.css'

/**
 * Components is a map of components that we will pass to our
 * MDX compiler to allow us to use components in the MDX file.
 */
export const components = {}

export function MDXContent({ content }) {
  return (
    <section className="w-1/2 flex flex-col flex-1 break-words prose prose-pre:p-0 prose-img:rounded-md prose-img:border-4 prose-img:border-zinc-600">
      {content}
    </section>
  )
}
