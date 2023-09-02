import React from 'react'
import Link from 'next/link'
import format from 'date-fns/format'

export const PostCard = ({ post }) => {
  const publishedDateDistance = format(new Date(post.data.publishedAt), 'MMMM dd, yyyy')

  return (
    <Link href={`/blog/${post.slug}`} className="flex flex-col lg:flex-row items-start mb-12">
      {/* <div className="w-full lg:w-1/4">
        <span>{publishedDateDistance}</span>
      </div> */}

      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mt-4 lg:mt-0 leading-none">{post.data.title}</h2>
        <span className="mt-4">{post.data.excerpt}</span>
        <span>{publishedDateDistance}</span>
      </div>
    </Link>
  )
}
