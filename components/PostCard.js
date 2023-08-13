import React from 'react'
import Link from 'next/link'
import format from 'date-fns/format'

export const PostCard = ({ post }) => {
  const publishedDateDistance = format(new Date(post.data.publishedAt), 'MMMM dd, yyyy')

  return (
    <Link href={`/${post.slug}`} className="flex flex-col lg:flex-row items-start mb-12">
        <div className="w-full lg:w-1/4 text-neutral-300">
          <span>{publishedDateDistance}</span>
        </div>

        <div className="w-full lg:w-3/4 flex flex-col lg:px-2 ">
          <h2 className="text-white text-2xl font-bold mt-4 lg:mt-0 leading-none">
            {post.data.title}
          </h2>
          <span className="text-neutral-300 mt-4">{post.data.excerpt}</span>
        </div>
    </Link>
  )
}
