import React from 'react'
import Link from 'next/link'

export const PostCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className="p-4 shadow-sm border rounded-md">
        <h3 className="text-xl text-zinc-900 font-bold">{post.data.title}</h3>
        <p className="text-zinc-700">{post.data.excerpt}</p>
      </a>
    </Link>
  )
}
