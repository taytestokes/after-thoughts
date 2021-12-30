import React from 'react'
import Link from 'next/link'

export const PostCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a>
        <div>
          <h3 className="text-xl font-bold">{post.data.title}</h3>
          <p className="text-gray-400">{post.data.excerpt}</p>
        </div>
      </a>
    </Link>
  )
}
