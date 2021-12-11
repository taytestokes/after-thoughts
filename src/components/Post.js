import React from 'react'
import Link from 'next/link'

export const Post = ({ post }) => {
  return (
    <div className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-4 mb-4">
      <h3 className="text-2xl font-bold">{post.attributes.title}</h3>
      <p className="mt-2 text-gray-400">{post.attributes.excerpt}</p>
      <div className="w-full flex items-center justify-between mt-2">
        <p className="text-sm mt-2 text-gray-400">{post.attributes.publishedAt}</p>

        <Link href={`/blog/${post.attributes.slug}`}>
          <a className="text-pink-500">Read More</a>
        </Link>
      </div>
    </div>
  )
}
