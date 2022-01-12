import React from 'react'
import Link from 'next/link'
import { HiLightningBolt } from 'react-icons/hi'

export const PostCard = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`}>
      <a className="flex flex-col items-start p-4 border border-zinc-600 rounded-md">
        {post.data.featured ? (
          <div className="flex items-center font-bold rounded-md space-x-2 mb-2">
            <HiLightningBolt />
            <p>Featured Post</p>
          </div>
        ) : null}
        <h3 className="text-xl font-extrabold">{post.data.title}</h3>
        <p className="text-zinc-400 mt-2">{post.data.excerpt}</p>
      </a>
    </Link>
  )
}
